/** Поле "Имя" */
const profileName = document.querySelector('.profile__name');
/** Поле "О себе"*/
const profileBio = document.querySelector('.profile__bio');
/** Кнопка открывающая попап */
const editButton = document.querySelector('.profile__edit-button');
/** Окно редактирования профиля */
const profilePopup = document.querySelector('#profile');
/** Кнопка закрывающая окно редактирования профиля нажатием на крестик */ 
const profileCloseButton = profilePopup.querySelector('#profile__close-icon');
/** Форма редактирования профиля */
const profileFormElement = profilePopup.querySelector('#profile-form');
/** Поле ввода имени в попап*/
const nameInput = profileFormElement.querySelector('#name'); 
/** Поле ввода информации о себе в попап */
const bioInput = profileFormElement.querySelector('#bio');
/** Кнопка открывающая попап добавления карточки */
const addButton = document.querySelector('.profile__add-button');
/** Окно добавления карточки */
const cardPopup = document.querySelector('#card');
/** Кнопка закрывающая окно добавления карточки нажатием на крестик */ 
const cardCloseButton = cardPopup.querySelector('#card__close-icon');
/** Форма добавления карточки */
const cardFormElement = cardPopup.querySelector('#card-form');
/** Поле названия карточки в попап*/
const headingInput = cardFormElement.querySelector('#heading'); 
/** Поле ссылки на картинку в попап */
const linkInput = cardFormElement.querySelector('#link');
/** Секция с карточками*/
const elements = document.querySelector('.elements');
/**  Карточка с картинкой для клонирования*/
const template = document.querySelector('#element').content;
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

/**Фунция добавления новой карточки через заполнение полей 'Название' и 'Ссылка на картинку' */
function addNewCard() {
  const element = template.cloneNode(true);
  const likeButtons = Array.from(element.querySelectorAll('.element__like-button'));
  const trashButton = Array.from(element.querySelectorAll('.element__trash-button'));

  const imagePopup = document.querySelector('#image');
  const image = imagePopup.querySelector('.popup__image');
  const caption = imagePopup.querySelector('.popup__heading');
  const cardImage = Array.from(element.querySelectorAll('.element__image'));
  const imageCloseButtons = Array.from(imagePopup.querySelectorAll('#image__close-icon'));
          
  element.querySelector('.element__image').src = initialCards.link;
  element.querySelector('.element__caption-heading').textContent = initialCards.name;
  element.querySelector('.element__image').alt = initialCards.name;

  imageCloseButtons.forEach((imageCloseButtons) => {
    imageCloseButtons.addEventListener('click', function() {
      imagePopup.classList.remove('popup_opened');
    });
  });

  cardImage.forEach((cardImage) => {
    cardImage.addEventListener('click', function() {
      image.src = initialCards.link;
      caption.textContent = initialCards.name;
      imagePopup.classList.add('popup_opened');
    });
  });
  
  likeButtons.forEach((likeButtons) => {
    likeButtons.addEventListener('click', () => likeButtons.classList.toggle('element__like-button_active'));
  });

  trashButton.forEach((trashButton) => {
     trashButton.addEventListener('click', function() {
      trashButton.closest('.element').remove(); 
    });
  });

  elements.prepend(element);
}

/** Фунция сохранения формы для новой карточки */
function cardFormSubmitHandler (evt) {
  if (headingInput.value == '' || linkInput.value == '') {
    evt.preventDefault();
  } else {
    evt.preventDefault();
    initialCards.name = headingInput.value;
    initialCards.link = linkInput.value;
    closeCardPopup();
    headingInput.value = '';
    linkInput.value = '';
    addNewCard();
  }
}

/** Функция добавления 6 карточек из елементов массима initialCards */
function addCards() {
  initialCards.forEach ((initialCards) => {
    const element = template.cloneNode(true);
    const likeButtons = Array.from(element.querySelectorAll('.element__like-button'));
    const trashButton = Array.from(element.querySelectorAll('.element__trash-button'));
    const imagePopup = document.querySelector('#image');
    const image = imagePopup.querySelector('.popup__image');
    const caption = imagePopup.querySelector('.popup__heading');
    const cardImage = Array.from(element.querySelectorAll('.element__image'));
    const imageCloseButtons = Array.from(imagePopup.querySelectorAll('#image__close-icon'));

    element.querySelector('.element__image').src = initialCards.link;
    element.querySelector('.element__caption-heading').textContent = initialCards.name;
    element.querySelector('.element__image').alt = initialCards.name;

    imageCloseButtons.forEach((imageCloseButtons) => {
      imageCloseButtons.addEventListener('click', function() {
        imagePopup.classList.remove('popup_opened');
      });
    });

    cardImage.forEach((cardImage) => {
      cardImage.addEventListener('click', function() {
        image.src = initialCards.link;
        caption.textContent = initialCards.name;
        imagePopup.classList.add('popup_opened');
      });
    });

    likeButtons.forEach((likeButtons) => {
      likeButtons.addEventListener('click', () => likeButtons.classList.toggle('element__like-button_active'));
    });
          
    trashButton.forEach((trashButton) => {
      trashButton.addEventListener('click', function() {
        trashButton.closest('.element').remove(); 
      });
    });
        
    elements.append(element);
  });
}
addCards();

/** Функция открытия окна редактрирования профиля нажатием на кнопку */
function openProfilePopup() {
    profilePopup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;
}

/** Функция закрытия окна редактрирования профиля нажатием на кнопку */
function closeProfilePopup() {
  profilePopup.classList.remove('popup_opened');
}

/** Функция отправки данных формы на сервер
 * при нажатии "сохранить" попап закрывается, данные сохраняются в поля "Имя" и "О себе"
 */
function profileFormSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
    closeProfilePopup();
}

/** Функция открытия окна добавления новоый карточки нажатием на кнопку */
function openCardPopup() {
    cardPopup.classList.add('popup_opened');
}
/** Функция закрытия окна добавления новой карточки нажатием на кнопку */
function closeCardPopup() {
  cardPopup.classList.remove('popup_opened');
  headingInput.value = '';
  linkInput.value = '';
}

profileFormElement.addEventListener('submit', profileFormSubmitHandler);
editButton.addEventListener('click', openProfilePopup);
profileCloseButton.addEventListener('click', closeProfilePopup);
cardFormElement.addEventListener('submit', cardFormSubmitHandler);
addButton.addEventListener('click', openCardPopup);
cardCloseButton.addEventListener('click', closeCardPopup);









