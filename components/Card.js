export class Card {
    constructor(config, item, handleCardClick) {
        this._imgName = item.imgName;
        this._imgUrl = item.imgUrl;
        this._config = config;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate(){
        this._element = document.querySelector(this._config.templateElement).content.querySelector(this._config.card).cloneNode(true);
        return this._element;
    }
    createCard() {
        this._getTemplate();
        this._element.querySelector(this._config.title).textContent = this._imgName;
        this._image = this._element.querySelector(this._config.image);
        this._image.src = this._imgUrl;
        this._image.imgUrl = this._imgUrl;
        this._image.alt = this._imgName;
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
        this._handleCardClick(this._imgName, this._imgUrl);
    }
    _likeCard() {
        this._buttonLike.classList.toggle(this._config.buttonLikeActive);
    }
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }
}
