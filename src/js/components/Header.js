import { BaseComponent } from './BaseComponent';

export class Header extends BaseComponent {
  constructor(menu, buttonHeaderMain, signOutButton, linkContainer) {
    super();
    this.menu = menu;
    this.buttonHeaderMain = buttonHeaderMain;
    this.signOutButton = signOutButton;
    this.linkContainer = linkContainer;
  }

  render(isLoggedIn, userName) {
    const signOutButtonText = this._findElement(this.signOutButton, '.button__header_text');

    const savedPagesLinkElement = this._findElement(this.linkContainer, '#saved-articles');

    if (isLoggedIn) {
      // Отрисовка имени пользователя
      this._setUserName(signOutButtonText, userName);
      // Скрываем кнопку Авторизация
      this.buttonHeaderMain.classList.remove('.button__is-visible');
      this.buttonHeaderMain.classList.add('.button__not-visible');
      // Отрисовываем кнопку выхода
      this.signOutButton.remove('.button__not-visible');
      this.signOutButton.add('.button__is-visible');
      // Появления ссылки на сохраненные статьи
      savedPagesLinkElement.classList.remove('header__link_not-visible');
      savedPagesLinkElement.classList.add('header__link_is-visible');
    } else {
      // Удаление имени пользователя
      this._clearUserName(signOutButtonText);
      // Скрываем кнопку выхода
      this.signOutButton.remove('.button__is-visible');
      this.signOutButton.add('.button__not-visible');
      // Отрисовываем кнопку авторизации
      this.buttonHeaderMain.classList.remove('.button__not-visible');
      this.buttonHeaderMain.classList.add('.button__is-visible');
      // Скрываем ссылку на сохраненные статьи
      savedPagesLinkElement.classList.remove('header__link_is-visible');
      savedPagesLinkElement.classList.add('header__link_not-visible');
    }
  }

  _setUserName(element, value) {
    element.textContent = value;
  }

  _clearUserName(element) {
    element.textContent = '';
  }

  openMenu() {
    this.menu.style.display = 'flex';
  }

  closeMenu() {
    this.menu.style.display = 'none';
  }
}
