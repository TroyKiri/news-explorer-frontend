import '../style.css';

import { mainConfig } from '../js/constants/config';

import { Auth } from '../js/utils/Auth';
import { Header } from '../js/components/Header';
import { MainApi } from '../js/api/MainApi';
import { NewsCardList } from '../js/components/NewsCardList';
import { NewsCard } from '../js/components/NewsCard';

document.querySelector('.results').style.display = 'flex';
const elHeader = document.querySelector('.header');
const elMenu = document.querySelector('.menu');
const signOutButton = elHeader.querySelector('#button-header-signout');
const signOutButtonMenu = document.querySelector('#button-header-menu-signout');
const menuButtonOpen = elHeader.querySelector('.header__icon');
const menuButtonClose = elMenu.querySelector('.header__icon');

const results = document.querySelector('.results');
const preloader = document.querySelector('.loading');
const resultsContainer = results.querySelector('.results__container');
const failed = document.querySelector('.failed');

// Класс для работы с токеном
const auth = new Auth();
const mainApi = new MainApi(mainConfig);
const newsCardList = new NewsCardList(
  results,
  preloader,
  resultsContainer,
  undefined,
  undefined,
  failed,
);

const header = new Header(
  elMenu,
  undefined,
  undefined,
  signOutButton,
  signOutButtonMenu,
  undefined,
  undefined,
);

// Выход из учётной записи
function exitFromAccount() {
  const exit = confirm('Вы точно хотите выйти из учётной записи?');
  if (exit) {
    auth.removeToken();
    window.location.href = '/';
  }
}
signOutButton.addEventListener('click', exitFromAccount);

// Открытие и закрытие меню
menuButtonOpen.addEventListener('click', header.openMenu.bind(header));
menuButtonClose.addEventListener('click', header.closeMenu.bind(header));

// Отрисовка шапки сайта, если пользователь авторизован

// Функция отрисовки шапки сайта
function headerRender(res) {
  const isLoggedIn = true;
  const userName = res.data.name;
  const token = auth.getToken();

  mainApi.getArticles(token)
    .then(() => {
      // savedArticles = result.data;
      header.renderSavedArticles(isLoggedIn, userName);
    })
    .catch((err) => console.log(err));
}
// Функция отрисовки страницы
function handlerLoadingPage(token) {
  if (token) {
    mainApi.getUserData(token)
      .then((res) => headerRender(res))
      .catch((err) => console.log(err));
  }
}

const token = auth.getToken(); // получаем токен
// const token = auth.removeToken();

if (token) {
  handlerLoadingPage(token); // отрисовываем страницу, если пользователь авторизован
}

newsCardList.showResults();
newsCardList.renderPreloader();

// Вывод сообщения об удалении
const showArticleMessageDelete = (event) => {
  // const token = auth.getToken();
  const articleMessage = event.target.querySelector('.article__message');
  // articleMessage.classList.toggle('article__message_not-visible');
  if (articleMessage.classList.contains('article__message_not-visible')) {
    articleMessage.classList.remove('article__message_not-visible');
    articleMessage.classList.add('article__message_is-visible');
  } else if (articleMessage.classList.contains('article__message_is-visible')) {
    articleMessage.classList.remove('article__message_is-visible');
    articleMessage.classList.add('article__message_not-visible');
  }
};

const deleteCard = (article, event) => {
  const icon = event.target.closest('.article__icon_delete');
  if (icon.classList.contains('article__icon_delete')) {
    const articleAdded = event.target.closest('.article');
    const deleteArticle = confirm('Вы точно хотите удалить статью?');
    if (deleteArticle) {
      mainApi.removeArticle(article._id, token)
        .catch((err) => console.log(err));
      resultsContainer.removeChild(articleAdded);
    }
  }
};

function addNewsCard(article) {
  const newsCard = new NewsCard(article, mainApi, resultsContainer, token);
  const articleCreated = newsCard.createArticleSaved();
  const articleCard = resultsContainer.lastElementChild;

  articleCard.querySelector('.article__icon_delete').addEventListener('mouseover', showArticleMessageDelete);
  articleCard.querySelector('.article__icon_delete').addEventListener('mouseout', showArticleMessageDelete);
  articleCard.querySelector('.article__icon_delete').addEventListener('click', deleteCard.bind(null, article));
  return articleCreated;
}

mainApi.getArticles(token)
  .then((res) => {
    mainApi.getUserData(token)
      .then((result) => {
        const userName = result.data.name;

        newsCardList.cards = res.data;
        if (newsCardList.cards.length > 0) {
          newsCardList.renderResSavedArticles();
          newsCardList.cards.forEach((article) => {
            addNewsCard(article);
          });
          newsCardList.addInfoAboutArticles(userName,
            newsCardList.cards.length, newsCardList.cards);
        } else {
          newsCardList.renderError();
        }
      });
  });
