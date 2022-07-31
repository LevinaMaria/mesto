export class Section {
    constructor({items, renderer}, containerSelector) {
      this._container = document.querySelector(containerSelector);
      this._items = items;
      this._renderer = renderer;
    }
  
    renderItems() {
      this._items.forEach(item => {
        this._renderer(item)
       })
    }
    addItem (domElement) {
      this._container.prepend(domElement)
    }
}