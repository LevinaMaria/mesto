export class Section {
    constructor({ renderer }, containerSelector) {
      this._renderer = renderer;
      this._container = containerSelector;
    };
  
    renderItems(cards) {
      cards.forEach(item => {
        this._renderer(item);
       });
    };

    addItem (element) {
      this._container.prepend(element);
    };
}
