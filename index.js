let nameParagraph = document.querySelector('.profile__info-name');  //поле имение
let bioParagraph = document.querySelector('.profile__info-bio'); //поле о себе
let nameInput = document.querySelector('.edit-form__name'); //инпут имени
let bioInput = document.querySelector('.edit-form__bio');   //инпут о себе

// открыть окно редактирования профиля
let editButton = document.querySelector('.profile__edit-button');

function addPopup() {
    let popup = document.querySelector('.profile__overlay');
    popup.setAttribute('style', 'display:flex');
    nameInput.value = nameParagraph.textContent;
    bioInput.value = bioParagraph.textContent;
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

// сохранить поля отправки попап нажатием на кнопку "сохранить"
let formElement = document.querySelector('.edit-form__submit-button');

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameParagraph.textContent = nameInput.value;
    bioParagraph.textContent = bioInput.value;
    closePopup();
}

formElement.addEventListener('click', formSubmitHandler); 

// сохранить поля отправки нажатием ентер при фокусе инпут "имя" и "о себе"
nameInput.addEventListener('keypress', function(evt) {
    if (evt.keyCode === 13) { 
        evt.preventDefault();
        nameParagraph.textContent = nameInput.value;
        bioParagraph.textContent = bioInput.value;
        closePopup();
    }
});

bioInput.addEventListener('keypress', function(evt) {
    if (evt.keyCode === 13) { 
        evt.preventDefault();
        nameParagraph.textContent = nameInput.value;
        bioParagraph.textContent = bioInput.value;
        closePopup();
    }
});
