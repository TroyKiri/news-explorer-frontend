import { BaseComponent } from './BaseComponent';

export class Header extends BaseComponent {
  constructor(props) {
    super();

    const { menu,  }
    this.menu = menu;
  }

  render(isLoggedIn, userName) {
    const signOutButtonText = this._findElement(
      this._navigation, '.button__text'
    );

    const savedPagesLinkElement = this._findElement(
      this._navigation, '#savedPages'
    );

    if (disabledLink) {
      savedPagesLinkElement.classList.add('header__nav-link_disable')
    } else {
      savedPagesLinkElement.classList.remove('header__nav-link_disable')
    }

    if(isLoggedIn) {
      this._setUserName(signOutButtonText, userName);
      this._navigation.classList.add('header__nav_is-auth');
    } else {
      this._clearUserName(signOutButtonText);
      this._navigation.classList.remove('.header__nav_is-auth');
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
