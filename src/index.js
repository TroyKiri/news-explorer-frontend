import './style.css';

import { Header } from './js/components/Header';
import { Popup } from './js/components/Popup';

const elHeader = document.querySelector('.header');
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
const popupSuccess = document.querySelector('#popup-success');

// КНОПКИ и ССЫЛКИ
// Кнопки для входа (login)
const buttonHeaderMenu = document.querySelector('.button__header_menu');
const buttonHeaderMain = document.querySelector('.button__header_main');
const linkLogin = elPopupSignUp.querySelector('#popup-link-login');
const linkSuccessLogin = popupSuccess.querySelector('#popup-success-link-login');
// Кнопки для регистрации (sign up)
const linkSignUp = elPopupLogin.querySelector('#popup-link-signup');
const buttonSignUp = elPopupSignUp.querySelector('#submit-signup');

// ЭКЗЕМПЛЯРЫ КЛАССОВ
// Экземпляр класса Header
const header = new Header(elMenu);
// Экземпляры попапов
const popupLogin = new Popup(elPopupLogin, formLogin);
const popupSignUp = new Popup(elPopupSignUp, formSignUp);

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