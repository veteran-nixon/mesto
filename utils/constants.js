export { nameInput, bioInput, cardAddButton, profileEditButton, initialCards, config }

/** Поле ввода имени в попап*/
const nameInput = document.querySelector('.popup__input_type_profile-name'); 
/** Поле ввода информации о себе в попап */
const bioInput = document.querySelector('.popup__input_type_profile-bio');
/** Кнопка, открывающая попап добавления карточки */
const cardAddButton = document.querySelector('.profile__add-button');
/** Кнопка, открывающая попап редактирования профиля */
const profileEditButton = document.querySelector('.profile__edit-button');

/** Массив с начальными карточками */
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  /** параметры валидации форм */
  const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }