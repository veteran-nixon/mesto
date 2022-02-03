import './index.css';
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

/** попап с картинкой */
const openPopupWithImage = new PopupWithImage('.popup_type_picture');
/** слушатель закрытия попап нажатием на крестик */
openPopupWithImage.setEventListeners();


  const deleteCardPopup = new PopupWithConfirmation('.popup_type_delete-card');
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

  




function likeClick(item, card) {
  if(card.isLiked(item)) {
    api.deleteLike(item._id)
    .then((item) => {
      card.countLikes(item)
    })
    .catch(err => console.log(err))
  
  } else if (!card.isLiked(item)) {
    api.putLike(item._id)
    .then((item) => {
      card.countLikes(item)
    })
    .catch(err => console.log(err))
  }
}

// function putLike(item, card) {
//   if(!card.isLiked()) {
//     api.putLike(item._id)
//     .then((item) => {
//       // console.log(item.likes)
//       card.countLikes(item)
//     })
//     .catch(err => console.log(err))
//   }
    
// }

// function deleteLike(item, card) {
//   if(card.isLiked()) {
//     api.deleteLike(item._id)
//     .then((item) => {
//       // console.log(item.likes)
//       card.countLikes(item)
//     })
//     .catch(err => console.log(err))
//   }
    
// }

// () => api.deleteCard(item._id)

/** создать экземляр карточки */
const copyCard = (item, user) => {
  const card = new Card(item, 
    user, 
    '#element', 
    () => openPopupWithImage.open(item), 
    () => deleteMyCard(item, card),
    () => likeClick(item, card)
  );
  const cardElement = card.generateCard();
  return cardElement;
}

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

/** добавить карточки на страницу */
api.getUser()
.then(user => {
  api.getCard()
  .then(data => {
      getCardList(data, user).renderItems();
    })
    .catch(err => console.log(err))
})


  /** добавить новую карточку */
  const createCard = new PopupWithForm('.popup_type_card-add',
    (data) => {
    const newItem = {
      name: data.heading,
      link: data.link
    }
    const cardList = new Section({
      item: data,
      renderer: (newItem) => {
        createCard.renderLoading(true, 'Сохранение')
        api.getUser()
          .then(user => {
            api.createNewCard(newItem)
            .then(newItem => {
              cardList.addNewItem(copyCard(newItem, user))
            })
            .finally(() => {
              createCard.renderLoading(false, 'Сохранить');
              createCard.close();
            })
          })
          .catch(err => console.log(err))
      }
    },
    '.elements');
    cardList.renderItem(newItem)
  });
  cardAddButton.addEventListener('click', () => {
    createCard.open();
    cardValidator.resetValidation();
  });
  createCard.setEventListeners();

  function getUserData(data) {
    const profileInfo = new UserInfo({ userName: data.name, userBio: data.about,  userAvatar: data.avatar });
    const userInfo = profileInfo.getUserInfo(data);
    return userInfo;
  }

/** загрузить информации о пользователе с сервера*/
api.getUser()
  .then((data) => {
    profileName.textContent = getUserData(data).name;
    profileAbout.textContent = getUserData(data).about;
    profileAvatar.src = getUserData(data).avatar;
  })
  .catch(err => console.log(err))

/** редактировать профиль */
const profilePopup = new PopupWithForm('.popup_type_profile', (data) => {
  const newUserInfo = {
    name: data.name,
    about: data.about
  }
  profilePopup.renderLoading(true, 'Сохранение');
  api.editProfile(newUserInfo)
    .then((newUserInfo) => {
      const newProfileInfo = new UserInfo({userName: newUserInfo.name, userBio: newUserInfo.about});
      newProfileInfo.setUserInfo(newUserInfo);
    })
    .catch(err => console.log(err))
    .finally(() => {
      profilePopup.renderLoading(false, 'Сохранить');
      profilePopup.close()
    })
  api.getUser()
    .then((data) => {
    profileName.textContent = getUserData(data).name;
    profileAbout.textContent = getUserData(data).about;
  })
  .catch(err => console.log(err))
});
profileEditButton.addEventListener('click', () => {
  api.getUser()
  .then((data) => {
    nameInput.value = getUserData(data).name;
    bioInput.value = getUserData(data).about;
    profileValidator.enableValidation();
    profilePopup.open();
  })
  .catch(err => console.log(err))
  profileValidator.resetValidation();
})
profilePopup.setEventListeners();

/** редактировать аватар */
const avatarPopup = new PopupWithForm('.popup_type_avatar', (data) => {
  const newUserAvatar = {
    avatar: data.avatar
  }
  avatarPopup.renderLoading(true, 'Сохранение')
  api.editAvatar(newUserAvatar)
    .then((newUserAvatar) => {
      const newProfileAvatar = new UserInfo({userAvatar: newUserAvatar.avatar});
      newProfileAvatar.setUserAvatar(newUserAvatar);
      newProfileAvatar.src = newProfileAvatar.avatar;
    })
    .then(() => {
      api.getUser()
      .then((data) => {
        profileAvatar.src = getUserData(data).avatar;
      })
    })
    .catch(err => console.log(err))
    .finally(() => {
      avatarPopup.renderLoading(false, 'Сохранить');
      avatarPopup.close();
    })
})

avatarEditeButton.addEventListener('click', () => {
  avatarPopup.open();
  avatarValidator.resetValidation();
})
avatarPopup.setEventListeners();





/**Валидация формы редактирования профиля */
const profileValidator =  new FormValidator(config, '.popup_type_profile');
profileValidator.enableValidation();


/**Валидация формы добавления новой карточки */
const cardValidator =  new FormValidator(config, '.popup_type_card-add');
cardValidator.enableValidation();

/** Валидация формы редактирования аватара */
const avatarValidator =  new FormValidator(config, '.popup_type_avatar');
avatarValidator.enableValidation();


