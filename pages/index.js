// import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/popupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { nameInput, bioInput, cardAddButton, profileEditButton,  config, profileName, profileAbout, avatarEditeButton, profileAvatar } from '../utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: 'c032b560-7e32-413c-bfbd-e51ec985da07',
    'Content-Type': 'application/json'
  }
});

/** Информация о пользователе */
const profileInfo = new UserInfo({});

/** попап с картинкой */
const openPopupWithImage = new PopupWithImage('.popup_type_picture');
/**Валидация формы редактирования профиля */
const profileValidator =  new FormValidator(config, '.popup_type_profile');
/**Валидация формы добавления новой карточки */
const cardValidator =  new FormValidator(config, '.popup_type_card-add');
/** Валидация формы редактирования аватара */
const avatarValidator =  new FormValidator(config, '.popup_type_avatar');
/**попап удаления карточки */
const deleteCardPopup = new PopupWithConfirmation('.popup_type_delete-card');

/** создать экземляр карточки */
const copyCard = (item, user) => {
  const card = new Card(item, 
    user, 
    '#element', 
    () => openPopupWithImage.open(item), 
    () => deleteMyCard(item, card),
    () => deleteLike(item, card),
    () => putLike(item, card)
  );
  const cardElement = card.generateCard();
  return cardElement;
}

/**функция удаления карточки */
function deleteMyCard(item, card) {
  deleteCardPopup.setSubmitCallback(() => {
    api.deleteCard(item)
      .then(() => card.deleteCard())
      .catch(err => console.log(err))
      .finally(() => deleteCardPopup.close())
    });
  deleteCardPopup.open();
  deleteCardPopup.setEventListeners();
}

/** поставить лайк */
function putLike(item, card) {
  api.putLike(item._id)
    .then((item) => {
    card.countLikes(item)
    })
    .catch(err => console.log(err))
}

/** удалить лайк */
function deleteLike(item, card) {
  api.deleteLike(item._id)
    .then((item) => {
      card.countLikes(item)
    })
    .catch(err => console.log(err))
}

/** добавить карточки на страницу */
function getCardList(data, user) {
  const cardList = new Section({
    item: data,
    renderer: (item) => {
      cardList.addItems(copyCard(item, user));
    }
  },
    '.elements');
  return cardList;
}

/** Загрузить информацию о пользователе и карточки с сервера*/
api.getAllData()
  .then(([user, data]) => {
    getCardList(data, user).renderItems()
    profileName.textContent = profileInfo.getUserInfo(user).name;
    profileAbout.textContent = profileInfo.getUserInfo(user).about;
    profileAvatar.src = profileInfo.getUserInfo(user).avatar;
  })

/** добавить новую карточку */
const createCardPopup = new PopupWithForm('.popup_type_card-add',
  (data) => {
    const newItem = {
      name: data.heading,
      link: data.link
    }
    const cardList = new Section({
      item: data,
      renderer: (newItem) => {
        createCardPopup.renderLoading(true, 'Сохранение')
        api.getUser()
          .then(user => {
            api.createNewCard(newItem)
            .then(newItem => {
              cardList.addNewItem(copyCard(newItem, user))
            })
            .finally(() => {
              createCardPopup.renderLoading(false, 'Сохранить');
              createCardPopup.close();
            })
          })
          .catch(err => console.log(err))
      }
    },
      '.elements');
    cardList.renderItem(newItem)
  });
  

/** редактировать профиль */
const profilePopup = new PopupWithForm('.popup_type_profile', (data) => {
  const newUserInfo = {
    name: data.name,
    about: data.about
  }
  profilePopup.renderLoading(true, 'Сохранение');
  api.editProfile(newUserInfo)
    .then((newUserInfo) => {
      profileInfo.setUserInfo(newUserInfo);
    })
    .catch(err => console.log(err))
    .finally(() => {
      profilePopup.renderLoading(false, 'Сохранить');
      profilePopup.close()
    })
  api.getUser()
    .then((data) => {
    profileName.textContent = profileInfo.getUserInfo(data).name;
    profileAbout.textContent = profileInfo.getUserInfo(data).about;
  })
  .catch(err => console.log(err))
});

/** редактировать аватар */
const avatarPopup = new PopupWithForm('.popup_type_avatar', (data) => {
  const newUserAvatar = {
    avatar: data.avatar
  }
  avatarPopup.renderLoading(true, 'Сохранение')
    api.editAvatar(newUserAvatar)
      .then((newUserAvatar) => {
        profileInfo.setUserAvatar(newUserAvatar);
        profileAvatar.src = newUserAvatar.avatar;
      })
     .then(() => {
        api.getUser()
          .then((data) => {
            profileAvatar.src = profileInfo.getUserInfo(data).avatar;
          })
      })
      .catch(err => console.log(err))
      .finally(() => {
        avatarPopup.renderLoading(false, 'Сохранить');
        avatarPopup.close();
      })
});

/**валидация форм */
profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();
/**слушатель попапа с картинкой */
openPopupWithImage.setEventListeners();
/**слушатели  редактирования аватара*/
avatarEditeButton.addEventListener('click', () => {
  avatarPopup.open();
  avatarValidator.resetValidation();
});
avatarPopup.setEventListeners();
/**слушатели  редактирования профиля*/
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  bioInput.value = profileAbout.textContent;
  profileValidator.enableValidation();
  profilePopup.open();
  profileValidator.resetValidation();
});
profilePopup.setEventListeners();
/**слушатели  добавления новой карточки*/
cardAddButton.addEventListener('click', () => {
  createCardPopup.open();
  cardValidator.resetValidation();
});
createCardPopup.setEventListeners();