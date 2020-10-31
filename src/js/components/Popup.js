import { BaseComponent } from './BaseComponent';

export class Popup extends BaseComponent {
  constructor(container, form, buttonMenu) {
    super();
    this.container = container;
    this.form = form;
    this.buttonMenu = buttonMenu;
  }

  open() {
    if (this.container.id === 'popup-success') {
      this.container.classList.add('popup_is-opened');
      this.container.querySelector('.popup__close').addEventListener('click', this.exit.bind(this));
      this.container.querySelector('.popup__link').addEventListener('click', this.close.bind(this));
    } else {
      // Сброс значений инпутов
      this.form.reset();
      // Удаление ошибок
      this.deleteErrors();
      // Открытие попапа
      this.container.classList.add('popup_is-opened');
      // Вешаем слушатели
      this.container.querySelector('.popup__close').addEventListener('click', this.exit.bind(this)); // закрытие попапа по нажатию на крестик
      this.container.querySelector('.popup__link').addEventListener('click', this.close.bind(this)); // закрытие попапа по нажатию на ссылку (регистрация или вход)
      // Отключаем кнопку
      this.form.elements.submit.disabled = true;
      this.form.elements.submit.classList.remove('popup__button_active');
      // Скрываем кнопку меню
      this.buttonMenu.style.opacity = 0;
    }
  }

  exit(event) {
    this.buttonMenu.style.opacity = 1;
    const popup = event.target.closest('.popup');
    popup.classList.remove('popup_is-opened');
  }

  close(event) {
    const popup = event.target.closest('.popup');
    popup.classList.remove('popup_is-opened');
  }

  hidePopup() {
    this.container.remove('popup_is-opened');
  }

  deleteErrors() {
    const elementss = Array.from(this.form.elements);
    const elements = elementss.filter(function (elem) {
      return !(elem.id === 'submit');
    });
    elements.forEach((elem) => {
      const errors = elem.nextElementSibling;
      errors.style.height = '15px';
      errors.textContent = '';
    });
    const serverError = this._findElement(this.form, '.popup__error-message_user');
    serverError.style.display = 'none';
  }
}
