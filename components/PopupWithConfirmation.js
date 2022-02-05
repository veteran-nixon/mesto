import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleDeleteSubmit);
    }

    setSubmitCallback(callback) {
        this._handleDeleteSubmit = callback;
     }

    close() {
        super.close();
        this._form.removeEventListener('submit', this._handleDeleteSubmit);
    }
     
}