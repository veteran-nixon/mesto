export { nameInput, bioInput, cardAddButton, profileEditButton, config, profileName, profileAbout, avatarEditeButton, profileAvatar }

/** Поле ввода имени в попап*/
const nameInput = document.querySelector('.popup__input_type_profile-name'); 
/** Поле ввода информации о себе в попап */
const bioInput = document.querySelector('.popup__input_type_profile-bio');
/** Кнопка, открывающая попап добавления карточки */
const cardAddButton = document.querySelector('.profile__add-button');
/** Кнопка, открывающая попап редактирования профиля */
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__bio');
const profileAvatar = document.querySelector('.profile__avatar');
const avatarEditeButton = document.querySelector('.profile__image');

  /** параметры валидации форм */
  const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }