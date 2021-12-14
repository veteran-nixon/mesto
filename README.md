# Место
*самостоятельный проект седьмого спринта курса "Веб-разработка" на Яндекс Практикуме о России*

### Обзор
1. Используется файловая структура по БЭМ (Nested).
2. Использованы Flex и Grid Layout системы для построении сетки.
3. Проект адаптирован под разную ширину экрана.
4. Ссылкам задано состояние при наведении на них указателя мыши.
5. При верстке использован макет из [Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1).
6. Подключен script.js.
7. При нажатии на кнопку "Edit" появляется всплывающее окно. 
8. Информация из профиля пользователя загружается в соответствующие поля "Имя" и "о себе".
9. При открытом попапе нажатие на клавишу "Enter" или кнопку "Сохранить" изменяет на странице информацию о пользователе.
10. При нажатии на крестик и в любую часть экрана вне попап закрывает его.
11. Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются. 

### Дополнения и изменения
1. Изменена HTML разметка. Использован тег <template> для добавления карточек.
2. При загрузке на странице есть 6 карточек, добавленных JavaScript.
3. Добавлена форма добавления новой карточки. Форма открывается нажатием на "+" и закрывается кликом на крестик.
4. При клике на «сохранить» новая карточка добавляется в начало контейнера с ними, диалоговое окно после добавления автоматически закрывается.
5. При нажатии на сердечко оно меняет цвет.
6. Карточки удалаются при клике на иконку удаления.
7. При клике на картинку карточки открыватеся попап с этой картинкой. Попап закрывается кликом на крестик.
8. Попап открывается и закрывается плавно.
9. Добавлена валидация формы редактирования профиля и добавления новой карточки. Если одно из полей формы невалидно, то кнопка "Сохранить" недоступна.
10. Попап закрывается кликом на Esc и на оверлей.
11. Рефакторинг части функционала. Созданы классы Card и FormValidator.
12. Классы экспортированы в index.js, отдельные js-файлы подключены в index.html как модули.

### _автор Долганёв Евгений, 2021_

#### [ссылка на проект](https://veteran-nixon.github.io/mesto/)