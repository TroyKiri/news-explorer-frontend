import './style.css';

const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
const menuButtonOpen = header.querySelector('.header__icon');
const menuButtonClose = menu.querySelector('.header__icon');

// Функции для открытия меню (для 320px)
const openMenu = function (event) {
  menu.style.display = 'flex';
};
const closeMenu = function () {
  menu.style.display = 'none';
};

// Открытие и закрытие меню
menuButtonOpen.addEventListener('click', openMenu);
menuButtonClose.addEventListener('click', closeMenu);
