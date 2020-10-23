export class Popup {
  constructor(container, form, buttonMenu) {
    this.container = container;
    this.form = form;
    this.buttonMenu = buttonMenu;
  }

  open() {
    if (this.container.id === 'popup-login' || this.container.id === 'popup-signup') {
      this.container.classList.add('popup_is-opened');
      this.container.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
      this.container.querySelector('.popup__link').addEventListener('click', this.close.bind(this));
      this.buttonMenu.style.opacity = 0;
      this.form.elements.submit.disabled = true;
      this.form.elements.submit.classList.remove('popup__button_active');
    }
  }

  close(event) {
    if (this.container.classList.contains('popup_is-opened')) {
      this.buttonMenu.style.opacity = 0;
    } else {
      this.buttonMenu.style.opacity = 1;
    }
    const popup = event.target.closest('.popup');
    popup.classList.remove('popup_is-opened');
  }
}
