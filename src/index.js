import './style.css';

// начальные статьи (пока не подключено API)
const initialArticles = [
  {
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    date: '2 августа, 2019',
    title: 'Национальное достояние – парки',
    text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
    source: 'Лента.ру'
  },
  {
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    date: '2 августа, 2019',
    title: 'Национальное достояние – парки',
    text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
    source: 'Лента.ру'
  },
  {
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    date: '2 августа, 2019',
    title: 'Национальное достояние – парки',
    text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
    source: 'Лента.ру'
  },
  {
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    date: '2 августа, 2019',
    title: 'Национальное достояние – парки',
    text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
    source: 'Лента.ру'
  },
  {
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    date: '2 августа, 2019',
    title: 'Национальное достояние – парки',
    text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
    source: 'Лента.ру'
  },
];

const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
const menuButtonOpen = header.querySelector('.header__icon');
const menuButtonClose = menu.querySelector('.header__icon');
const resultsContainer = document.querySelector('.results__container');
// const articles = resultsContainer.querySelectorAll('.article');
// Кнопка показать ещё
const buttonMore = document.querySelector('.results__button');
//Попапы
const popup = document.querySelector('.popup');
const popupLogin = document.querySelector('#popup-login');
const popupSignUp = document.querySelector('#popup-signup');
const popupSuccess = document.querySelector('#popup-success');
//Кнопки для входа
const buttonHeaderMenu = document.querySelector('.button__header_menu');
const buttonHeaderMain = document.querySelector('.button__header_main');
const linkLogin = popupSignUp.querySelector('#popup-link-login');
const linkSuccessLogin = popupSuccess.querySelector('#popup-success-link-login')
//Кнопка для регистрации
const linkSignUp = popupLogin.querySelector('#popup-link-signup');
const buttonSignUp = popupSignUp.querySelector('#submit-signup');
//Кнопка закрытия попапов
const buttonCloseLogin = popupLogin.querySelector('.popup__close');
const buttonCloseSignUp = popupSignUp.querySelector('.popup__close');
const buttonCloseSuccess = popupSuccess.querySelector('.popup__close');

// Функции для открытия и закрытия меню (для 320px)
const openMenu = function () {
  menu.style.display = 'flex';
};
const closeMenu = function () {
  menu.style.display = 'none';
};

//Функции открытия и закрытия попапов
// Попап логина
function openFormLogin() {
  closeFormSuccess();
  closeFormSignUp();
  menuButtonOpen.style.opacity = 0;
  closeMenu();
  popupLogin.classList.add('popup_is-opened');
}
function closeFormLogin() {
  menuButtonOpen.style.opacity = 1;
  popupLogin.classList.remove('popup_is-opened');
}
// Попап регистрации
function openFormSignUp() {
  closeFormLogin();
  menuButtonOpen.style.opacity = 0;
  popupSignUp.classList.add('popup_is-opened');
}
function closeFormSignUp() {
  menuButtonOpen.style.opacity = 1;
  popupSignUp.classList.remove('popup_is-opened');
}
// Попап успешной регистрации
function openFormSuccess() {
  closeFormSignUp();
  menuButtonOpen.style.opacity = 0;
  popupSuccess.classList.add('popup_is-opened');
}
function closeFormSuccess() {
  menuButtonOpen.style.opacity = 1;
  popupSuccess.classList.remove('popup_is-opened');
}

// Открытие и закрытие меню
menuButtonOpen.addEventListener('click', openMenu);
menuButtonClose.addEventListener('click', closeMenu);

//Открытие и закрытие попапов
//Попап логина
buttonHeaderMenu.addEventListener('click',openFormLogin);
buttonHeaderMain.addEventListener('click',openFormLogin);
linkLogin.addEventListener('click',openFormLogin);
linkSuccessLogin.addEventListener('click', openFormLogin)
//Попап регистрации
linkSignUp.addEventListener('click', openFormSignUp);
//Попап успешной регистрации
buttonSignUp.addEventListener('click', openFormSuccess);
//Закрытие попапа
buttonCloseLogin.addEventListener('click', closeFormLogin);
buttonCloseSignUp.addEventListener('click', closeFormSignUp);
buttonCloseSuccess.addEventListener('click', closeFormSuccess);

// функция добавления статей
function addArticle(image, date, title, text, source) {
  const html = `<div class="article">
            <div class="article__info article__info_main">
              <div class="article__icon article__icon_save">
                <p class="article__message article__message_save">Войдите, чтобы сохранять статьи</p>
              </div>
            </div>
            <img class="article__image" alt="image" src=${image}>
            <div class="article__container">
              <p class="article__date">${date}</p>
              <h2 class="article__title">${title}</h2>
              <p class="article__text">${text}</p>
            </div>
            <p class="article__source">${source}</p>
          </div>`;
  return resultsContainer.insertAdjacentHTML('beforeend', html);
}

function addListArticles(articles) {
  articles.forEach(function (article, index) {
    // if (index <=2) {
    //
    // }
    addArticle(article.image, article.date, article.title, article.text, article.source);

  });
};

addListArticles(initialArticles);
console.log(addListArticles);
// const articles = resultsContainer.querySelectorAll('.article');
// console.log(articles);

// buttonMore.addEventListener('click', addListArticles(articles));