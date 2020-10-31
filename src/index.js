import './style.css';

// Подключение констант
import { mainConfig, newsConfig } from './js/constants/config';
// Подключение вспомогательных функций
import { preparationDataArticle } from './js/utils/preparationDataArticle';

// Подключение классов компонентов
import { Header } from './js/components/Header';
import { Popup } from './js/components/Popup';
import { Form } from './js/components/Form';
import { MainApi } from './js/api/MainApi';
import { Auth } from './js/utils/Auth';
import { NewsCardList } from './js/components/NewsCardList';
import { NewsApi } from './js/api/NewsApi';
import { NewsCard } from './js/components/NewsCard';

// DOM-элементы-------------------------------------------------------------------------------------

// Шапка сайта
const elHeader = document.querySelector('.header');
const elHeaderContainer = elHeader.querySelector('.header__container');
const elHeaderMenuContainer = document.querySelector('.header__container_menu');
// Всплывающее меню шапки сайта для мобильной версии
const elMenu = document.querySelector('.menu');
const menuButtonOpen = elHeader.querySelector('.header__icon');
const menuButtonClose = elMenu.querySelector('.header__icon');

// ПОПАПЫ
// Логин
const elPopupLogin = document.querySelector('#popup-login');
const formLogin = document.querySelector('.popup__form_login');
// Регистрация
const elPopupSignUp = document.querySelector('#popup-signup');
const formSignUp = document.querySelector('.popup__form_signup');
// Успешная регистрация
const elPopupSuccess = document.querySelector('#popup-success');

// КНОПКИ и ССЫЛКИ
// Кнопки для входа (login)
const buttonHeaderMenu = document.querySelector('.button__header_menu');
const buttonHeaderMain = document.querySelector('#button-header-auth');
const buttonHeaderMenuMain = document.querySelector('#button-header-menu-auth');
const linkLogin = elPopupSignUp.querySelector('#popup-link-login');
const linkSuccessLogin = elPopupSuccess.querySelector('#popup-success-link-login');
const buttonSignIn = elPopupLogin.querySelector('.popup__button_signin');
// Кнопки для регистрации (sign up)
const linkSignUp = elPopupLogin.querySelector('#popup-link-signup');
const buttonSignUp = elPopupSignUp.querySelector('.popup__button_signup');
// Кнопка выхода
const signOutButton = elHeader.querySelector('#button-header-signout');
const signOutButtonMenu = document.querySelector('#button-header-menu-signout');

// ФОРМА ПОИСКА СТАТЕЙ
const formSearch = document.querySelector('.search__form');
const buttonSearch = formSearch.querySelector('.button__search');
const searchInput = document.querySelector('.search__input');
const results = document.querySelector('.results');
const resultsContainer = results.querySelector('.results__container');
const resultsTittle = results.querySelector('.results__title');
const resultsButton = results.querySelector('.results__button');
const preloader = document.querySelector('.loading');
const failed = document.querySelector('.failed');

// Массив статей
// let savedArticles = [];
// Количество отображаемых статей
const CARDS_DISPLAY = 3;

// ЭКЗЕМПЛЯРЫ КЛАССОВ-------------------------------------------------------------------------------

// Экземпляр класса Header
const header = new Header(
  elMenu,
  buttonHeaderMain,
  buttonHeaderMenuMain,
  signOutButton,
  signOutButtonMenu,
  elHeaderContainer,
  elHeaderMenuContainer,
);
// Экземпляры попапов
const popupLogin = new Popup(elPopupLogin, formLogin, menuButtonOpen);
const popupSignUp = new Popup(elPopupSignUp, formSignUp, menuButtonOpen);
const popupSuccess = new Popup(elPopupSuccess);
// Экземпляры форм
const formRegistration = new Form(formSignUp);
const formEntry = new Form(formLogin);
const searchForm = new Form(formSearch);
// MainApi
const mainApi = new MainApi(mainConfig);
// NewsApi
const newsApi = new NewsApi(newsConfig);
// Класс для работы с токеном
const auth = new Auth();
// Класс для секции со статьями
const newsCardList = new NewsCardList(
  results,
  preloader,
  resultsContainer,
  resultsButton,
  resultsTittle,
  failed,
);

// ФУНКЦИОНАЛ---------------------------------------------------------------------------------------

// Открытие и закрытие меню
menuButtonOpen.addEventListener('click', header.openMenu.bind(header));
menuButtonClose.addEventListener('click', header.closeMenu.bind(header));

// ПОПАПЫ
// Попап входа
buttonHeaderMenu.addEventListener('click', header.closeMenu.bind(header)); // закрытие меню при открытии попапа логина
buttonHeaderMenu.addEventListener('click', popupLogin.open.bind(popupLogin));
buttonHeaderMain.addEventListener('click', popupLogin.open.bind(popupLogin));
linkLogin.addEventListener('click', popupLogin.open.bind(popupLogin));
linkSuccessLogin.addEventListener('click', popupLogin.open.bind(popupLogin));
// Попап регистрации
linkSignUp.addEventListener('click', popupSignUp.open.bind(popupSignUp));

// Валидация
formEntry.setEventListeners();
formRegistration.setEventListeners();

// Регистрация
function signUp(event) {
  event.preventDefault();

  const formData = formRegistration.getInfo();
  mainApi.signup(formData)
    .then((res) => {
      if (!res.message) {
        popupSignUp.hidePopup();
        return popupSuccess.open();
      }
      return Promise.reject(res.message);
    })
    .catch((err) => formRegistration.setServer(err));
}

buttonSignUp.addEventListener('click', signUp);

// Отрисовка шапки сайта, если пользователь авторизован

// Функция отрисовки шапки сайта
function headerRender(res) {
  const isLoggedIn = true;
  const userName = res.data.name;
  const token = auth.getToken();

  mainApi.getArticles(token)
    .then((result) => {
      // savedArticles = result.data;
      header.render(isLoggedIn, userName);
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

// Авторизация
function signIn(event) {
  event.preventDefault();

  const formData = formEntry.getInfo();
  mainApi.signin(formData)
    .then((res) => {
      const { token } = res;
      if (token) {
        auth.setToken(token);
        mainApi.getUserData(token)
          .then((result) => headerRender(result))
          .catch((err) => err);

        popupLogin.hidePopup();
        window.location.reload();
      }
      return Promise.reject(res.message);
    })
    .catch((err) => {
      formEntry.setServer(err);
    });
}
buttonSignIn.addEventListener('click', signIn);

// Выход из учётной записи
function exitFromAccount() {
  const exit = confirm('Вы точно хотите выйти из учётной записи?');
  if (exit) {
    auth.removeToken();
    window.location.reload();
  }
}
signOutButton.addEventListener('click', exitFromAccount);
signOutButtonMenu.addEventListener('click', exitFromAccount);

// Вывод сообщения о необходимости регистрации
const showArticleMessageAuth = (event) => {
  // const token = auth.getToken();
  if (!token) {
    const articleMessage = event.target.querySelector('.article__message');
    // articleMessage.classList.toggle('article__message_not-visible');
    if (articleMessage.classList.contains('article__message_not-visible')) {
      articleMessage.classList.remove('article__message_not-visible');
      articleMessage.classList.add('article__message_is-visible');
    } else if (articleMessage.classList.contains('article__message_is-visible')) {
      articleMessage.classList.remove('article__message_is-visible');
      articleMessage.classList.add('article__message_not-visible');
    }
  }
};

// Поиск статей
function addCard(article, newsCard, event) {
  // console.log(article);
  const icon = event.target.closest('.article__icon');
  // const token = auth.getToken();
  if (token) {
    if (icon.classList.contains('article__icon_save')) {
      icon.classList.remove('article__icon_save');
      icon.classList.add('article__icon_save-auth');
      const articleAdded = event.target.closest('.article');
      mainApi.createArticle(article, token)
        .then((res) => {
          articleAdded.id = res.article._id;
        })
        .catch((err) => console.log(err));
    } else if (icon.classList.contains('article__icon_save-auth')) {
      icon.classList.remove('article__icon_save-auth');
      icon.classList.add('article__icon_save');
      const articleAdded = event.target.closest('.article');
      mainApi.removeArticle(articleAdded.id, token)
        .catch((err) => console.log(err));
    }
  }
  // event.target.closest('.article').style.display = 'none';
}

function addNewsCard(article) {
  const searchValue = searchInput.value;
  const articlePreparationed = preparationDataArticle(article, searchValue);
  const newsCard = new NewsCard(articlePreparationed, mainApi, resultsContainer, token);
  const articleCreated = newsCard.createArticle();
  const articleCard = resultsContainer.lastElementChild;

  articleCard.querySelector('.article__icon_save').addEventListener('mouseover', showArticleMessageAuth);
  articleCard.querySelector('.article__icon_save').addEventListener('mouseout', showArticleMessageAuth);
  articleCard.querySelector('.article__icon_save').addEventListener('click', addCard.bind(null, articlePreparationed, newsCard));
  return articleCreated;
}

function showMoreCards() {
  const searchValue = searchInput.value;
  for (let i = newsCardList.counter; i < newsCardList.counter + CARDS_DISPLAY; i++) {
    if (newsCardList.articles[i]) {
      addNewsCard(newsCardList.articles[i], searchValue);
    } else {
      newsCardList.showMore(false);
      break;
    }
  }
  newsCardList.counter += CARDS_DISPLAY;
}

const search = function (event) {
  event.preventDefault();
  if (newsCardList.articles !== undefined) {
    while (resultsContainer.firstChild) {
      resultsContainer.removeChild(resultsContainer.firstChild);
    }
  }
  // const token = auth.getToken();
  const searchValue = searchInput.value;
  newsCardList.showResults();
  newsCardList.renderPreloader();

  if (searchValue.length === 0) {
    newsCardList.renderError();
  }
  // if (token) {
  //   mainApi
  //     .getArticles(token)
  //     .then((res) => {
  //       savedArticles = res.data;
  //     })
  //     .catch((err) => err);
  // }
  newsApi.getNews(searchValue)
    .then((res) => {
      if (res.status === 'ok') {
        newsCardList.articles = res.articles;
        newsCardList.renderResults(showMoreCards);
        if (newsCardList.articles.length > 0) {
          for (let i = 0; i < CARDS_DISPLAY; i++) {
            if (newsCardList.articles[i]) {
              addNewsCard(newsCardList.articles[i], searchValue);
            } else {
              break;
            }
          }
          if (newsCardList.articles.length > CARDS_DISPLAY) {
            newsCardList.showMore(true);
            newsCardList.counter = CARDS_DISPLAY;
          }
          // searchForm.formEnabled();
        } else {
          newsCardList.renderError();
          // return Promise.reject(res.message);
          // searchForm.formEnabled();
        }
      }
      // formSearch.reset();
    })
    .catch((err) => {
      console.log(err);
      newsCardList.renderError();
    });
};

buttonSearch.addEventListener('click', search);
