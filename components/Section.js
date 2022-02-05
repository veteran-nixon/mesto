export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItems(element) {
        this._container.append(element);
    }

    addNewItem(element) {
        this._container.prepend(element);
    }

    renderItems(user, data) {
        data.forEach((item) => {
            this._renderer(item, user);
        });
    }
}