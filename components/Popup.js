export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeIcon = document.querySelector(popupSelector).querySelector('.popup__close-icon');
        this._openedPopup = document.querySelector('.popup_opened');
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', (e) => this._handleEscClose(e));
        document.addEventListener('click', (e) => this._handleClickClose(e));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (e) => this._handleEscClose(e));
        document.removeEventListener('click', (e) => this._handleClickClose(e));
    }

    _handleEscClose(e) {
        if(e.key === 'Escape') {
            this.close(e)
        }   
    }

    _handleClickClose(e) {
        if(e.target.classList.contains('popup')) {
            this.close(e.target);
        }   
    }

    setEventListeners() {
        this._closeIcon.addEventListener('click', () => this.close());
    }
}