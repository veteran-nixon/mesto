export {config, FormValidator};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  errorClass: 'popup__input-error_active'
}

class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._formElement = document.querySelector(formElement);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
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
    const inputList = this._inputList;
    const buttonElement = this._buttonElement;
    this._toggleButtonState(inputList, buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {  
            this._isValid(inputElement)
            this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true)
        buttonElement.classList.add(this._inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled', true)
        buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  enableValidation() {
    

    this._setEventListeners();
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
  
      return !inputElement.validity.valid;
    });
  };

  resetValidation() {
    const inputList = this._inputList;
    const buttonElement = this._buttonElement;
    
    this._toggleButtonState(inputList, buttonElement); 

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  
}