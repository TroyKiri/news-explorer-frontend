import './style.css';

import { mainConfig } from './js/constants/config';

import { Header } from './js/components/Header';
import { Popup } from './js/components/Popup';
import { Form } from './js/components/Form';
import { MainApi } from './js/api/MainApi';
import { Auth } from './js/utils/Auth';

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
// Кнопки для регистрации (sign up)
const linkSignUp = elPopupLogin.querySelector('#popup-link-signup');
const buttonSignUp = elPopupSignUp.querySelector('.popup__button_signup');
// Кнопка выхода
const signOutButton = elHeader.querySelector('#button-header-signout');

// Массив статей
let savedArticles = [];

// ЭКЗЕМПЛЯРЫ КЛАССОВ
// Экземпляр класса Header
const header = new Header(elMenu, buttonHeaderMain, signOutButton, elHeaderContainer);
// Экземпляры попапов
const popupLogin = new Popup(elPopupLogin, formLogin, menuButtonOpen);
const popupSignUp = new Popup(elPopupSignUp, formSignUp, menuButtonOpen);
const popupSuccess = new Popup(elPopupSuccess);
// Экземпляры форм
const formRegistration = new Form(formSignUp);
const formEntry = new Form(formLogin);
// MainApi
const mainApi = new MainApi(mainConfig);
// Класс для работы с токеном
const auth = new Auth();

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

// Отрисовка шапки сайта, если пользователь авторизован

// Функция отрисовки шапки сайта
function headerRender(res) {
  const isLoggedIn = true;
  const userName = res.data.name;
  const token = auth.getToken();

  mainApi.getArticles(token)
    .then((result) => {
      savedArticles = result.data;
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

if (token) {
  handlerLoadingPage(token); // отрисовываем страницу, если пользователь авторизован
}

// Открытие и закрытие меню
menuButtonOpen.addEventListener('click', header.openMenu.bind(header));
menuButtonClose.addEventListener('click', header.closeMenu.bind(header));

// Вывод сообщения о необходимости регистрации
const saveIconArticle = document.querySelector('.article__icon_save');

const showArticleMessageAuth = (event) => {
  if (!token) {
    const articleMessage = event.target.querySelector('.article__message');
    articleMessage.classList.toggle('article__message_not-visible');
  }
};

saveIconArticle.addEventListener('mouseover', showArticleMessageAuth);

// Регистрация
function signUp(event) {
  event.preventDefault();

  const formData = formRegistration.getInfo();
  console.log(formData);
  mainApi.signup(formData)
    .then((res) => {
      if (!res.message) {
        return popupSuccess.open();
      }
      return Promise.reject(res.message);
    })
    .catch((err) => console.log(err));
}

buttonSignUp.addEventListener('click', signUp);

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