let nameParagraph = document.querySelector('.profile__name');  //поле имение
let bioParagraph = document.querySelector('.profile__bio'); //поле о себе
let nameInput = document.querySelector('.popup__name'); //инпут имени
let bioInput = document.querySelector('.popup__bio');   //инпут о себе

// открыть окно редактирования профиля
let editButton = document.querySelector('.profile__edit-button');

function addPopup() {
    let popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');
    nameInput.value = nameParagraph.textContent;
    bioInput.value = bioParagraph.textContent;
}

editButton.addEventListener('click', addPopup);

// закрыть окно редактирования профиля нажатием на крестик
let closeButton = document.querySelector('.popup__close-icon');

function closePopup() {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

// закрыть окно редактирования профиля нажатием на любую часть экрана вне попап
window.addEventListener('click', function(event) {
    let popup = document.querySelector('.popup');
    if (event.target == popup) {
        popup.classList.remove('popup_opened');
    }
});

// сохранить поля отправки попап нажатием на кнопку "сохранить"
let formElement = document.querySelector('.popup__submit-button');

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

// менять цвет кнопки лайка
let likeButtons = document.querySelectorAll('.element__like-button');

for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener('click', function likeClick() {
        likeButtons[i].classList.toggle('element__like-button_active');
    });
}





