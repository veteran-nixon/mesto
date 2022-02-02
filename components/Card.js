export default class Card {
    constructor(data, user, cardSelector, openPopup, handleDeleteCard, putLike, deleteLike) {
      this._user = user._id;
      this._owner = data.owner._id;
      this._name = data.name;
      this._link = data.link;
      this._alt = data.name;
      this._likes = data.likes;
      this._cardSelector = cardSelector;
      this._openPopup = openPopup;
      this._handleDeleteCard = handleDeleteCard;
      this._putLike = putLike;
      this._deleteLike = deleteLike;

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
      this._likeCounter = this._element.querySelector('.element__like-counter');
      this._trashButton = this._element.querySelector('.element__trash-button');
      this._cardPopup = document.querySelector('.popup_type_picture');
      // this._deletePopup = document.querySelector('.popup_type_delete-card')

      this._cardImage.src = this._link;
      this._cardCaption.textContent = this._name;
      this._cardImage.alt = this._name;

      this._removeTrashButton();
      this.renderLike();
      this._setEventListeners();

      return this._element;
    }

    _setEventListeners() {

      this._likeButton.addEventListener('click', () => {
        if(this.isLiked()) {
          this._deleteLike();
          this._likeButton.classList.remove('element__like-button_active');
        } else {
          this._putLike();
          this._likeButton.classList.add('element__like-button_active');
        }
      });
      
      

      this._trashButton.addEventListener('click', () => {
          this._handleDeleteCard(this._element)
      });

      this._cardImage.addEventListener('click', () => {
        this._openPopup(this._name, this._link);
      });
    }

    _removeTrashButton() {
      if(this._user !== this._owner) {
        this._trashButton.remove();
      }
    }

    _likeClick() {
      this._likeButton.classList.toggle('element__like-button_active');
    }

    deleteCard() {
      this._element.remove();
      this._element = null;
    }

    isLiked() {
      if(this._likes.some((user) => user._id === this._user)) return true;
      else return false;
    }

    // countLikes() {
    //   this._likeCounter.textContent = this._likes.length;
    //   this._likeButton.classList.add('element__like-button_active');
    // }


    

    countLikes(data) {
      if(this.isLiked()) {
        this._deleteLike();
        this._likeCounter.textContent = data.likes.length;
      } else {
        this._putLike();
        this._likeCounter.textContent = data.likes.length;
        
      }
    }

    renderLike() {
      this._likeCounter.textContent = this._likes.length;
      if(this.isLiked()) {
        this._likeButton.classList.add('element__like-button_active');
      } else {
        this._likeButton.classList.remove('element__like-button_active');
      }
    }





    // _handleCardClick(name, link) { 
    //   this._cardPopup.querySelector('.popup__image').src = link; 
    //   this._cardPopup.querySelector('.popup__image').alt = name; 
    //   this._cardPopup.querySelector('.popup__heading').textContent = name; 
    //   this._openPopup(this._cardPopup);
    // }
  }

  