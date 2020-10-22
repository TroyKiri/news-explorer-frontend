export class Popup {
  constructor(container, form) {
    this.container = container;
    this.form = form;
  }

  open() {
    if (this.container.id === 'popup-login' || this.container.id === 'popup-signup') {
      this.container.classList.add('popup_is-opened');
      this.container.querySelector('.popup__close').addEventListener('click', this.close);
      this.container.querySelector('.popup__link').addEventListener('click', this.close);
      this.form.elements.submit.disabled = true;
      this.form.elements.submit.classList.remove('popup__button_active');
    }
  }

  close(event) {
    const popup = event.target.closest('.popup');
    popup.classList.remove('popup_is-opened');
  }
}
