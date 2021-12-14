import { initialCards, Card } from './Cards.js';
import { config, FormValidator } from './FormValidator.js';


/** Поле "Имя" */
const profileName = document.querySelector('.profile__name');
/** Поле "О себе"*/
const profileBio = document.querySelector('.profile__bio');
/** Кнопка открывающая попап */
const profileEditButton = document.querySelector('.profile__edit-button');
/** Окно редактирования профиля */
const profilePopup = document.querySelector('.popup_type_profile');
/** Кнопка закрывающая окно редактирования профиля нажатием на крестик */ 
const profileCloseButton = profilePopup.querySelector('.popup__close-icon');
/** Форма редактирования профиля */
const profileFormElement = profilePopup.querySelector('.popup__form');
/** Поле ввода имени в попап*/
const nameInput = profileFormElement.querySelector('.popup__input_type_profile-name'); 
/** Поле ввода информации о себе в попап */
const bioInput = profileFormElement.querySelector('.popup__input_type_profile-bio');
/** Кнопка открывающая попап добавления карточки */
const cardAddButton = document.querySelector('.profile__add-button');
/** Окно добавления карточки */
const cardPopup = document.querySelector('.popup_type_card-add');
/** Кнопка закрывающая окно добавления карточки нажатием на крестик */ 
const cardCloseButton = cardPopup.querySelector('.popup__close-icon');
/** Кнопка сабмита новой карточки */
const cardPopupSubmitButton = cardPopup.querySelector('.popup__submit-button');
/** Форма добавления карточки */
const cardFormElement = cardPopup.querySelector('.popup__form');
/** Поле названия карточки в попап*/
const headingInput = cardFormElement.querySelector('.popup__input_type_card-add-heading'); 
/** Поле ссылки на картинку в попап */
const linkInput = cardFormElement.querySelector('.popup__input_type_card-add-link');
/** Секция с карточками*/
// const elements = document.querySelector('.elements');
// /**  Карточка с картинкой для клонирования*/
// const template = document.querySelector('#element').content;
/** Попап с картикой */
const imagePopup = document.querySelector('.popup_type_picture');
/** Кнопка закрывающая попап с картинкой */
const imageCloseButton = imagePopup.querySelector('.popup__close-icon');
const escCode = 'Escape';

/** Функция открытия попап */
function openPopup(e) {
    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('click', closeByClick);
    e.classList.add('popup_opened');
}

/** Функция закрытия попап */
function closePopup(e) {
    document.removeEventListener('keydown', closeByEsc);
    document.removeEventListener('click', closeByClick);
    e.classList.remove('popup_opened');
}

/** Функция отправки данных формы на сервер
 * при нажатии "сохранить" попап закрывается, данные сохраняются в поля "Имя" и "О себе"
 */
 function profileFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  closePopup(profilePopup);
}

/** Функция добавления 6 карточек из елементов массива initialCards */
initialCards.forEach((cardItem) => {
  const card = new Card(cardItem, '#element');
  const cardElement = card.generateCard();

  document.querySelector('.elements').append(cardElement);
});

/** Фунция сохранения формы для новой карточки */
function cardFormSubmitHandler (evt) {
  evt.preventDefault();
    /** Объект полей карточки из поля добавления новой карточки */
    const newCard = {
      name: headingInput.value,
      link: linkInput.value
    };
    /** Добавить новую карточку */
    const addNewCard = new Card(newCard, '#element');
    const newCardElement = addNewCard.generateCard();
    document.querySelector('.elements').prepend(newCardElement);

    closePopup(cardPopup);
    headingInput.value = '';
    linkInput.value = '';
    cardPopupSubmitButton.setAttribute('disabled', true)
    cardPopupSubmitButton.classList.add('popup__submit-button_inactive');
}

/** Открыть попап редактирования профиля */
profileEditButton.addEventListener('click', () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
});
/** Закрыть попап редактирования профиля */
profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
/** Сохранить изменения полей "Имя" и "О себе" */
profileFormElement.addEventListener('submit', profileFormSubmitHandler);

/** Открыть попап добавления новой карточки */
cardAddButton.addEventListener('click', () => {
  openPopup(cardPopup);
  headingInput.value = '';
  linkInput.value = '';
});
/** Закрыть попап добавления новой карточки */
cardCloseButton.addEventListener('click', () => {
  closePopup(cardPopup);
  headingInput.value = '';
  linkInput.value = '';
});
/** Добавить новую карточку на страницу */
cardFormElement.addEventListener('submit', cardFormSubmitHandler);

/** Закрыть попап с картинкой */
imageCloseButton.addEventListener('click', () => closePopup(imagePopup));

function closeByEsc(evt) {
  if (evt.key === escCode) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}

function closeByClick(evt) {
  if (evt.target.classList.contains('popup')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

/**Валидация формы редактирования профиля */
const profileValidator =  new FormValidator(config, '.popup_type_profile');
profileValidator.enableValidation();

/**Валидация формы добавления новой карточки */
const cardValidator =  new FormValidator(config, '.popup_type_card-add');
cardValidator.enableValidation();