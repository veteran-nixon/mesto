export default class Card {
    constructor(data, cardSelector, openPopup) {
      this._name = data.name;
      this._link = data.link;
      this._alt = data.name;
      this._cardSelector = cardSelector;
      this._openPopup = openPopup;
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
        this._openPopup(this._name, this._link);
      });
    }

    _likeClick() {
      this._likeButton.classList.toggle('element__like-button_active');
    }

    _deleteCard() {
      this._element.remove();
      this._element = null;
    }

    // _handleCardClick(name, link) { 
    //   this._cardPopup.querySelector('.popup__image').src = link; 
    //   this._cardPopup.querySelector('.popup__image').alt = name; 
    //   this._cardPopup.querySelector('.popup__heading').textContent = name; 
    //   this._openPopup(this._cardPopup);
    // }
  }

  