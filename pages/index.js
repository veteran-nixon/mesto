import './index.css';
import { config, FormValidator } from '../components/FormValidator.js';
import { initialCards, Card } from '../components/Card.js';
import PopupWithImage from '../components/popupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { nameInput, bioInput, cardAddButton, profileEditButton } from '../utils/constants.js'

/** попап с картинкой */
const openPopupWithImage = new PopupWithImage('.popup_type_picture');
/** слушатель закрытия попап нажатием на крестик */
openPopupWithImage.setEventListeners();

/** добавить 6 карточек на страницу */
const cardList = new Section({
  item: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#element', () => openPopupWithImage.open(item));
    const cardElement = card.generateCard();
    cardList.addItems(cardElement);
    }
  },
  '.elements');
cardList.renderItems();

  /** добавить новую карточку */
  const createCard = new PopupWithForm('.popup_type_card-add', 
    (data) => {
    const newItem = {
      name: data.heading,
      link: data.link
    }
    const newCard = new Card(newItem, '#element', () => openPopupWithImage.open(newItem));
    const cardElement = newCard.generateCard();
    cardList.addNewItem(cardElement);
    }
  );
  cardAddButton.addEventListener('click', () => createCard.open());
  createCard.setEventListeners();

  /** попап редактирования профиля */
const profileInfo = new UserInfo({userName: '.profile__name', userBio: '.profile__bio'});
/** вставить значения полей "имя" и "о себе" из html в поля редактирования профиля */
profileInfo.getUserInfo();

/** редактировать профиль */
const profilePopup = new PopupWithForm('.popup_type_profile', (data) => {
  const newUserInfo = {
    name: data.name,
    bio: data.bio
  }
  console.log(newUserInfo)
  profileInfo.setUserInfo(newUserInfo)
});
profileEditButton.addEventListener('click', () => { 
  profilePopup.open();
  const getUserInfo = profileInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  bioInput.value = getUserInfo.bio
})
profilePopup.setEventListeners();

/**Валидация формы редактирования профиля */
const profileValidator =  new FormValidator(config, '.popup_type_profile');
profileValidator.enableValidation();


/**Валидация формы добавления новой карточки */
const cardValidator =  new FormValidator(config, '.popup_type_card-add');
cardValidator.enableValidation();

