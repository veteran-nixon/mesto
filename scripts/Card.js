export {initialCards, Card};

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

  class Card {
    constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._alt = data.name;
      this._cardSelector = cardSelector;
      // this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

      return cardElement;
    }

    generateCard() {
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.element__image');
      this._cardCaption = this._element.querySelector('.element__caption-heading');
      this._likeButton = this._element.querySelector('.element__like-button');
      this._trashButton = this._element.querySelector('.element__trash-button');
      this._cardPopup = document.querySelector('.popup_type_picture');

      this._cardImage.src = this._link;
      this._cardCaption.textContent = this._name;
      this._cardImage.alt = this._name;

      this._setEventListeners();

      return this._element;
    }

    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        this._likeClick();
      });

      this._trashButton.addEventListener('click', () => {
        this._deleteCard();
      });

      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
    }

    _likeClick() {
      this._likeButton.classList.toggle('element__like-button_active');
    }

    _deleteCard() {
      this._element.remove();
      this._element = null;
    }

    _handleCardClick(name, link) {
      this._cardPopup.querySelector('.popup__image').src = link;
      this._cardPopup.querySelector('.popup__image').alt = name;
      this._cardPopup.querySelector('.popup__heading').textContent = name;
      document.addEventListener('keydown', (evt) => {
        if (evt.key === "Escape") {
          this._cardPopup.classList.remove('popup_opened');
        }
      });
      document.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
          this._cardPopup.classList.remove('popup_opened');
        }
      });
      this._cardPopup.classList.add('popup_opened');
    }
  }

  