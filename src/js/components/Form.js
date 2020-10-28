import { BaseComponent } from './BaseComponent';

export class Form extends BaseComponent {
  constructor(form) {
    super();
    this.form = form;
  }

  setServer(err) {
    this._showError(err);
  }

  // setServerError(err) {
  //   const errorElement = this._generateError(err);

  //   this
  //     ._submitButton
  //     .parentElement
  //     .insertBefore(
  //       errorElement,
  //       this._submitButton
  //     )

  //   this.formEnabled();
  //   this._submitButtonDisabled(this._submitButton);
  // }

  _showError(text) {
    const error = this._findElement(this.form, '.popup__error-message_user');
    error.style.display = 'block';
    error.innerHTML = text;
    return error;
  }

  _validateInputElement(input, error, button) {
    let isInputValid = true;
    const validErrors = {
      ObligatoryField: 'Это обязательное поле',
      nameLength: 'Должно быть от 2 до 30 символов',
      mustBeEmail: 'Неправильный формат email',
      passwordLength: 'Должно быть не менее 8 символов',
    };
    if (input.validity.valueMissing) {
      error.textContent = validErrors.ObligatoryField;
      error.classList.add('popup__error-message_invalid-input');
      error.classList.remove('popup__error-message_valid-input');
      input.classList.add('popup__input_invalid');
      input.classList.remove('popup__input_valid');
      isInputValid = false;
      button.classList.remove('popup__button_signup-valid');
      button.classList.add('popup__button_signup-invalid');
    } else if (input.validity.typeMismatch) {
      error.textContent = validErrors.mustBeEmail;
      error.classList.add('popup__error-message_invalid-input');
      error.classList.remove('popup__error-message_valid-input');
      input.classList.add('popup__input_invalid');
      input.classList.remove('popup__input_valid');
      isInputValid = false;
      button.classList.remove('popup__button_signup-valid');
      button.classList.add('popup__button_signup-invalid');
    } else if (input.validity.tooLong || input.validity.tooShort) {
      error.textContent = validErrors.nameLength;
      error.classList.add('popup__error-message_invalid-input');
      error.classList.remove('popup__error-message_valid-input');
      input.classList.add('popup__input_invalid');
      input.classList.remove('popup__input_valid');
      isInputValid = false;
      button.classList.remove('popup__button_signup-valid');
      button.classList.add('popup__button_signup-invalid');
    } else {
      error.classList.remove('popup__error-message_invalid-input');
      error.classList.add('popup__error-message_valid-input');
      input.classList.add('popup__input_valid');
      input.classList.remove('popup__input_invalid');
      button.classList.remove('popup__button_signup-invalid');
      button.classList.add('popup__button_signup-valid');
    }
    return isInputValid;
  }

  _validateForm(button, status) {
    if (status) {
      button.classList.remove('popup__button_not-active');
      button.classList.add('popup__button_active');
      button.disabled = false;
    } else {
      button.classList.remove('popup__button_active');
      button.classList.add('popup__button_not-active');
      button.disabled = true;
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', () => {
      let isFormValid = true;
      const elementss = Array.from(this.form.elements);
      const elements = elementss.filter((elem) => !(elem.id === 'submit'));
      elements.forEach((elem) => {
        const errors = elem.nextElementSibling;
        const button = this.form.querySelector('.button');
        const isValidInput = this._validateInputElement(elem, errors, button);
        if (!isValidInput) {
          isFormValid = false;
        }
        // const button = this.form.querySelector('.button');
        this._validateForm(button, isFormValid);
      });
    });
  }

  _clear() {

  }

  getInfo() {
    const elementss = Array.from(this.form.elements);
    const elements = elementss.filter((elem) => !(elem.id === 'submit'));
    const obj = elements.reduce(function (arr, { name, value }) {
      return { ...arr, [name]: value };
    }, {});
    return obj;
  }
}
