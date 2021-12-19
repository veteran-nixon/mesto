export {config, FormValidator};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = document.querySelector(formElement);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {  
            this._isValid(inputElement)
            this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
        this._buttonElement.setAttribute('disabled', true)
        this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
        this._buttonElement.removeAttribute('disabled', true)
        this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
  
      return !inputElement.validity.valid;
    });
  };

  resetValidation() {
    
    this._toggleButtonState(); 

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  
}