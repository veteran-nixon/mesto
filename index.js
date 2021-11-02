// открыть окно редактирования профиля
let editButton = document.querySelector('.profile__edit-button');

function addPopup() {
    let popup = document.querySelector('.profile__overlay');
    popup.setAttribute('style', 'display:flex');
}

editButton.addEventListener('click', addPopup);

// закрыть окно редактирования профиля нажатием на крестик
let closeButton = document.querySelector('.edit-form__close-icon');

function closePopup() {
    let popup = document.querySelector('.profile__overlay');
    popup.removeAttribute('style', 'display:flex');
}

closeButton.addEventListener('click', closePopup);

// закрыть окно редактирования профиля нажатием на любую часть экрана вне попап
window.addEventListener('click', function(event) {
    let popup = document.querySelector('.profile__overlay');
    if (event.target == popup) {
        popup.removeAttribute('style', 'display:flex');
    }
});

// сохранить поля отправки попап
let formElement = document.querySelector('.edit-form__submit-button');
let nameInput = document.querySelector('.edit-form__name');
let jobInput = document.querySelector('.edit-form__bio');

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameParagraph = document.querySelector('.profile__info-name');
    let bioParagraph = document.querySelector('.profile__info-bio');
    nameParagraph.textContent = nameInput.value;
    bioParagraph.textContent = jobInput.value;
}

formElement.addEventListener('click', formSubmitHandler); 


