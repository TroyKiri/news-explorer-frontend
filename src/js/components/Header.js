import { BaseComponent } from './BaseComponent';

export class Header extends BaseComponent {
  constructor(
    menu,
    buttonHeaderMain,
    buttonHeaderMenuMain,
    signOutButton,
    signOutButtonMenu,
    linkContainer,
    elHeaderMenuContainer,
  ) {
    super();
    this.menu = menu;
    this.buttonHeaderMain = buttonHeaderMain;
    this.buttonHeaderMenuMain = buttonHeaderMenuMain;
    this.signOutButton = signOutButton;
    this.signOutButtonMenu = signOutButtonMenu;
    this.linkContainer = linkContainer;
    this.elHeaderMenuContainer = elHeaderMenuContainer;
  }

  render(isLoggedIn, userName) {
    const signOutButtonText = this._findElement(this.signOutButton, '.button__header_text');
    const signOutButtonMenuText = this._findElement(this.signOutButtonMenu, '.button__header_text');

    const savedPagesLinkElement = this._findElement(this.linkContainer, '#saved-articles');
    const savedPagesLinkMenuElement = this._findElement(this.elHeaderMenuContainer, '#saved-articles-menu');

    if (isLoggedIn) {
      // Отрисовка имени пользователя
      this._setUserName(signOutButtonText, userName);
      this._setUserName(signOutButtonMenuText, userName);
      // Скрываем кнопку Авторизация
      this.buttonHeaderMain.classList.remove('button__is-visible');
      this.buttonHeaderMain.classList.add('button__not-visible');
      this.buttonHeaderMenuMain.remove('button__is-visible');
      this.buttonHeaderMenuMain.classList.add('button__not-visible');
      // Отрисовываем кнопку выхода
      this.signOutButton.classList.remove('button__not-visible');
      this.signOutButton.classList.add('button__is-visible');
      this.signOutButtonMenu.classList.remove('button__not-visible');
      this.signOutButtonMenu.classList.add('button__is-visible');
      // Появления ссылки на сохраненные статьи
      savedPagesLinkElement.classList.remove('header__link_not-visible');
      savedPagesLinkElement.classList.add('header__link_is-visible');
      savedPagesLinkMenuElement.classList.remove('header__link_not-visible');
      savedPagesLinkMenuElement.classList.add('header__link_is-visible');
    } else {
      // Удаление имени пользователя
      this._clearUserName(signOutButtonText);
      // Скрываем кнопку выхода
      this.signOutButton.remove('button__is-visible');
      this.signOutButton.add('button__not-visible');
      // Отрисовываем кнопку авторизации
      this.buttonHeaderMain.classList.remove('button__not-visible');
      this.buttonHeaderMain.classList.add('button__is-visible');
      // Скрываем ссылку на сохраненные статьи
      savedPagesLinkElement.classList.remove('header__link_is-visible');
      savedPagesLinkElement.classList.add('header__link_not-visible');
    }
  }

  renderSavedArticles(isLoggedIn, userName) {
    // Отрисовка имени пользователя
    const signOutButtonText = this._findElement(this.signOutButton, '.button__header_text');
    const signOutButtonMenuText = this._findElement(this.signOutButtonMenu, '.button__header_text-menu');
    if (isLoggedIn) {
      this._setUserName(signOutButtonText, userName);
      this._setUserName(signOutButtonMenuText, userName);
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
