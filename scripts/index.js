/** Поле "Имя" */
let profileName = document.querySelector('.profile__name');
/** Поле "О себе"*/
let profileBio = document.querySelector('.profile__bio');
/** Кнопка открывающая попап */
let editButton = document.querySelector('.profile__edit-button');
/** Окно редактирования профиля */
let popup = document.querySelector('.popup');
/** Кнопка закрывающая окно редактирования профиля нажатием на крестик */ 
let closeButton = document.querySelector('.popup__close-icon');
/** Форма редактирования профиля */
let formElement = document.querySelector('.popup__form');
/** Поле ввода имени в попап*/
let nameInput = formElement.querySelector('#name'); 
/** Поле ввода информации о себе в попап */
let bioInput = formElement.querySelector('#bio');

/** Функция открытия окна редактрирования профиля нажатием на кнопку */
function addPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;
}
/** Функция закрытия окна редактрирования профиля нажатием на кнопку */
function closePopup() {
    popup.classList.remove('popup_opened');
}

/** Функция отправки данных формы на сервер
 * при нажатии "сохранить" попап закрывается, данные сохраняются в поля "Имя" и "О себе"
 */
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', addPopup);
closeButton.addEventListener('click', closePopup);









