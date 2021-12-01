const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  errorClass: 'popup__input-error_active'
};

const showInputError = (config, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
}

const hideInputError = (config, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
}

const isValid = (config, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(config, formElement, inputElement);
    }
  }; 

const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(config, inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {  
            isValid(config, formElement, inputElement)
            toggleButtonState(config, inputList, buttonElement);
    });
});
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(config, formElement);
    });
  };

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
  
      return !inputElement.validity.valid;
    });
  };

const toggleButtonState = (config, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true)
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled', true)
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
  };
  
  enableValidation(config); 