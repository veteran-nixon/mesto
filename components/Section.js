export default class Section {
    constructor({item, renderer}, containerSelector) {
        this._renderedItems = item;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItems(element) {
        this._container.append(element);
    }

    addNewItem(element) {
        this._container.prepend(element);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }

    renderItem(item) {
        this._renderer(item);
    }
}