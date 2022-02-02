import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/popupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { nameInput, bioInput, cardAddButton, profileEditButton,  config, profileName, profileAbout, avatarEditeButton, profileAvatar } from '../utils/constants.js';

const apiCard = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-34/cards',
  headers: {
    authorization: 'c032b560-7e32-413c-bfbd-e51ec985da07',
    'Content-Type': 'application/json'
  }
});

const apiUser = new Api({
  url: 'https://nomoreparties.co/v1/cohort-34/users/me',
  headers: {
    authorization: 'c032b560-7e32-413c-bfbd-e51ec985da07',
    'Content-Type': 'application/json'
  }
});

/** попап с картинкой */
const openPopupWithImage = new PopupWithImage('.popup_type_picture');
/** слушатель закрытия попап нажатием на крестик */
openPopupWithImage.setEventListeners();

function deleteCard(item, card) {
  const deleteCardPopup = new PopupWithForm('.popup_type_delete-card', () => {
    apiCard.deleteCard(item)
      .then(() => card.deleteCard(card))
  })
  deleteCardPopup.open()
  deleteCardPopup.setEventListeners()
}

// function likeClick(item, card) {
//   if(card.isLiked()) {
//     apiCard.deleteLike(item)
//     .then(() => {
//       card.countLikes()
//     })
//     .catch(err => console.log(err))
  
//   } else {
//     apiCard.putLike(item)
//     .then(() => {
//       card.countLikes()
//     })
//     .catch(err => console.log(err))
//   }
//   apiCard.getObject(item)
//     .then(console.log(item.likes.length))
// }

function putLike(item, card) {
  if(!card.isLiked()) {
    apiCard.putLike(item._id)
    .then((item) => {
      // console.log(item.likes)
      card.countLikes(item)
    })
    .catch(err => console.log(err))
  }
}

function deleteLike(item, card) {
  if(card.isLiked()) {
    apiCard.deleteLike(item._id)
    .then((item) => {
      // console.log(item.likes)
      card.countLikes(item)
    })
    .catch(err => console.log(err))
  }
}

// () => apiCard.deleteCard(item._id)

/** создать экземляр карточки */
const copyCard = (item, user) => {
  const card = new Card(item, 
    user, 
    '#element', 
    () => openPopupWithImage.open(item), 
    () => deleteCard(item._id, card), 
    () => putLike(item, card), 
    () => deleteLike(item, card)
  );
  const cardElement = card.generateCard();
  return cardElement;
}

/** добавить карточки на страницу */
apiUser.getObject()
.then(user => {
  apiCard.getObject()
  .then(data => {
    const cardList = new Section({
        item: data,
        renderer: (item) => {
          cardList.addItems(copyCard(item, user));
          }
        },
        '.elements');
      cardList.renderItems();
      
    })
})


  /** добавить новую карточку */
  const createCard = new PopupWithForm('.popup_type_card-add',
    (data) => {
    const newItem = {
      name: data.heading,
      link: data.link
    }
    const cardList = new Section({
      item: newItem,
      renderer: (newItem) => {
        createCard.renderLoading(true, 'Сохранение')
        apiUser.getObject()
          .then(user => {
            apiCard.createNewCard(newItem)
            .then(newItem => {
              cardList.addNewItem(copyCard(newItem, user))
            })
            .finally(() => {
              createCard.renderLoading(false, 'Сохранить');
            })
          })
          
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

/** загрузить информации о пользователе с сервера*/
apiUser.getObject()
  .then((data) => {
    const profileInfo = new UserInfo({userName: data.name, userBio: data.about});
    const userInfo = profileInfo.getUserInfo(data);
    profileName.textContent = userInfo.name;
    profileAbout.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
  })

  /** загрузить информации о пользователе с сервера*/
apiUser.getObject()
.then((data) => {
  const profileInfo = new UserInfo({userAvatar: data.avatar});
  const userInfo = profileInfo.getUserInfo(data);
  profileAvatar.src = userInfo.avatar;
})

/** редактировать профиль */
const profilePopup = new PopupWithForm('.popup_type_profile', (data) => {
  const newUserInfo = {
    name: data.name,
    about: data.about
  }
  profilePopup.renderLoading(true, 'Сохранение');
  apiUser.editProfile(newUserInfo)
    .then((newUserInfo) => {
      const newProfileInfo = new UserInfo({userName: newUserInfo.name, userBio: newUserInfo.about});
      newProfileInfo.setUserInfo(newUserInfo);
    })
    .finally(() => {
      profilePopup.renderLoading(false, 'Сохранить');
    })
  apiUser.getObject()
    .then((data) => {
    const profileInfo = new UserInfo({userName: data.name, userBio: data.about});
    const userInfo = profileInfo.getUserInfo(data);
    profileName.textContent = userInfo.name;
    profileAbout.textContent = userInfo.about;
  })
});
profileEditButton.addEventListener('click', () => {
  apiUser.getObject()
  .then((data) => {
    const profileInfo = new UserInfo({userName: data.name, userBio: data.about});
    const userInfo = profileInfo.getUserInfo(data);
    nameInput.value = userInfo.name;
    bioInput.value = userInfo.about;
    profileValidator.enableValidation();
  })
  profilePopup.open();
  profileValidator.resetValidation();
})
profilePopup.setEventListeners();

/** редактировать аватар */
const avatarPopup = new PopupWithForm('.popup_type_avatar', (data) => {
  const newUserAvatar = {
    avatar: data.avatar
  }
  avatarPopup.renderLoading(true, 'Сохранение')
  apiUser.editAvatar(newUserAvatar)
    .then((newUserAvatar) => {
      const newProfileAvatar = new UserInfo({userAvatar: newUserAvatar.avatar});
      newProfileAvatar.setUserAvatar(newUserAvatar);
      newProfileAvatar.src = newProfileAvatar.avatar;
    })
    .then(() => {
      apiUser.getObject()
      .then((data) => {
        const profileInfo = new UserInfo({userAvatar: data.avatar});
        const userInfo = profileInfo.getUserInfo(data);
        profileAvatar.src = userInfo.avatar;
      })
    })
    .catch(err => console.log(err))
    .finally(() => {
      avatarPopup.renderLoading(false, 'Сохранить');
    })
    /** переписать в 1 метод гетюзер */
    
  
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


