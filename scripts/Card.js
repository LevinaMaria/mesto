export class Card {
    constructor(config, name, link, viewPopupImage) {
        this._config = config;
        this._name = name;
        this._link = link;
        this._viewPopupImage = viewPopupImage;
    }
    _getTemplate(){
        this._element = document.querySelector(this._config.templateElement).content.querySelector(this._config.card).cloneNode(true);
        return this._element;
    }
    createCard() {
        this._getTemplate();
        this._element.querySelector(this._config.title).textContent = this._name;
        this._image = this._element.querySelector(this._config.image);
        this._image.src = this._link;
        this._image.link = this._link;
        this._image.alt = this._name;
        this._setListeners();
        return this._element;
    }
    _setListeners() {
        this._buttonLike = this._element.querySelector(this._config.buttonLike);
        this._buttonDelete = this._element.querySelector(this._config.buttonDelete);
        this._buttonDelete.addEventListener('click', () => this._deleteCard());
        this._buttonLike.addEventListener('click', () => this._likeCard());
        this._image.addEventListener('click', () => this._handlePopupImage());
    }
    _handlePopupImage() {
        this._viewPopupImage(this._name, this._link);
    }
    _likeCard() {
        this._buttonLike.classList.toggle(this._config.buttonLikeActive);
    }
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }
}
