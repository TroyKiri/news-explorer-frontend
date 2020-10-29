import './style.css';

// Подключение констант
import { mainConfig, newsConfig } from './js/constants/config';
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
const linkLogin = elPopupSignUp.querySelector('#popup-link-login');
const linkSuccessLogin = elPopupSuccess.querySelector('#popup-success-link-login');
const buttonSignIn = elPopupLogin.querySelector('.popup__button_signin');
// Кнопки для регистрации (sign up)
const linkSignUp = elPopupLogin.querySelector('#popup-link-signup');
const buttonSignUp = elPopupSignUp.querySelector('.popup__button_signup');
// Кнопка выхода
const signOutButton = elHeader.querySelector('#button-header-signout');

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
let savedArticles = [];
const CARDS_DISPLAY = 3;

// ЭКЗЕМПЛЯРЫ КЛАССОВ-------------------------------------------------------------------------------

// Экземпляр класса Header
const header = new Header(elMenu, buttonHeaderMain, signOutButton, elHeaderContainer);
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

// const newsCard = new NewsCard();

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

// Вывод сообщения о необходимости регистрации
const saveIconArticle = document.querySelector('.article__icon_save');

const showArticleMessageAuth = (event) => {
  if (!token) {
    const articleMessage = event.target.querySelector('.article__message');
    articleMessage.classList.toggle('article__message_not-visible');
  }
};

// saveIconArticle.addEventListener('mouseover', showArticleMessageAuth);

// Поиск статей
function addNewsCard(article) {
  const articlePreparationed = preparationDataArticle(article);
  const html = `<div class="article">
            <div class="article__info article__info_main">
              <div class="article__icon article__icon_save">
                <p class="article__message article__message_save">Войдите, чтобы сохранять статьи</p>
              </div>
            </div>
            <img class="article__image" alt="image" src=${articlePreparationed.image}>
            <div class="article__container">
              <p class="article__date">${articlePreparationed.date}</p>
              <h2 class="article__title">${articlePreparationed.title}</h2>
              <p class="article__text">${articlePreparationed.text}</p>
            </div>
            <p class="article__source">${articlePreparationed.source}</p>
          </div>`;
  return resultsContainer.insertAdjacentHTML('beforeend', html);
}

function showMoreCards() {
  const searchValue = searchInput.value;
  console.log(newsCardList.counter);
  for (let i = newsCardList.counter; i < newsCardList.counter + CARDS_DISPLAY; i++) {
    if (newsCardList.articles[i]) {
      addNewsCard(newsCardList.articles[i]);
      // addNewsCard(newsCardList.articles[i], searchValue);
    } else {
      newsCardList.showMore(false);
      break;
    }
  }
  newsCardList.counter += CARDS_DISPLAY;
}

const search = function (event) {
  event.preventDefault();
  console.log(newsCardList.articles);
  if (newsCardList.articles !== undefined) {
    while (resultsContainer.firstChild) {
      resultsContainer.removeChild(resultsContainer.firstChild);
    }
  }
  // const token = auth.getToken();
  const searchValue = searchInput.value;
  console.log(searchValue);

  newsCardList.showResults();
  newsCardList.renderPreloader();

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
        console.log(newsCardList.articles);
        newsCardList.renderResults(showMoreCards);
        if (newsCardList.articles.length > 0) {
          for (let i = 0; i < CARDS_DISPLAY; i++) {
            if (newsCardList.articles[i]) {
              addNewsCard(newsCardList.articles[i]);
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
          console.log('дошло');
          newsCardList.renderError();
          // searchForm.formEnabled();
        }
      }
      formSearch.reset();
    })
    .catch((err) => {
      console.log(err);
    });
};

buttonSearch.addEventListener('click', search);
// buttonSearch.addEventListener('submit', search);

// const resultsContainer = document.querySelector('.results__container');
// const articles = resultsContainer.querySelectorAll('.article');
// Кнопка показать ещё
// const buttonMore = document.querySelector('.results__button');

// функция добавления статей
// function addArticle(image, date, title, text, source) {
//   const html = `<div class="article">
//             <div class="article__info article__info_main">
//               <div class="article__icon article__icon_save">
//                 <p class="article__message article__message_save">Войдите, чтобы сохранять статьи</p>
//               </div>
//             </div>
//             <img class="article__image" alt="image" src=${image}>
//             <div class="article__container">
//               <p class="article__date">${date}</p>
//               <h2 class="article__title">${title}</h2>
//               <p class="article__text">${text}</p>
//             </div>
//             <p class="article__source">${source}</p>
//           </div>`;
//   return resultsContainer.insertAdjacentHTML('beforeend', html);
// }

// function addListArticles(articles) {
//   articles.forEach(function (article, index) {
//     // if (index <=2) {
//     //
//     // }
//     addArticle(article.image, article.date, article.title, article.text, article.source);

//   });
// };

// addListArticles(initialArticles);
// console.log(addListArticles);
// const articles = resultsContainer.querySelectorAll('.article');
// console.log(articles);

// buttonMore.addEventListener('click', addListArticles(articles));