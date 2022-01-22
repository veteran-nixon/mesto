import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._link = this._popup.querySelector('.popup__image');
        this._name = this._popup.querySelector('.popup__heading');
    }

    open(data) { 
        this._link.src = data.link;
        this._link.alt = data.alt;
        this._name.textContent = data.name;
        super.open();
      }

}