import '../style.css';

import { Auth } from '../js/utils/Auth';

// Класс для работы с токеном
const auth = new Auth();

document.querySelector('.results').style.display = 'flex';
const elHeader = document.querySelector('.header');
const signOutButton = elHeader.querySelector('#button-header-signout');

// Выход из учётной записи
function exitFromAccount() {
  const exit = confirm('Вы точно хотите выйти из учётной записи?');
  if (exit) {
    auth.removeToken();
    window.location.href = '/';
  }
}
signOutButton.addEventListener('click', exitFromAccount);
