export class Card {
    constructor(config, item, handleCardClick, handleLikeClick, popupConfirm, user) {
        this._name = item.name;
        this._link = item.link;
        this._cardId = item._id;
        this._likesArr = item.likes;
        this._cardOwner = item.owner;
        this._config = config;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._popupConfirm = popupConfirm;
        this._user = user;
    }

    _getTemplate(){
        this._element = document.querySelector(this._config.templateElement).content.querySelector(this._config.card).cloneNode(true);
        return this._element;
    }
    createCard() {
        this._getTemplate();
        this._element.querySelector(this._config.title).textContent = this._name;
        this._image = this._element.querySelector(this._config.image);
        this._likesCounter = this._element.querySelector(this._config.likesCounter);
        this._likesCounter.textContent = this._likesArr.length;
        this._image.src = this._link;
        // this._image.link = this._link;
        this._image.alt = this._name;
        this._setListeners();
        this._renderTrashIcon();
        this._renderLikeIcon();
        return this._element;
    }
    _setListeners() {
        this._buttonLike = this._element.querySelector(this._config.buttonLike);
        this._buttonDelete = this._element.querySelector(this._config.buttonDelete);
        this._buttonDelete.addEventListener('click', () => {
            this._popupConfirm.open(this._cardId, this._element)
        });
        this._buttonLike.addEventListener('click', () => this._handleLikeCard());
        this._image.addEventListener('click', () => this._handlePopupImage());
    }
    _handlePopupImage() {
        this._handleCardClick(this._name, this._link);
    }
    _isAnyLikesBefore() {
        return this._likesArr.some((like) => {
            return like._id === this._user._id
        })
    }
    _handleLikeCard () {
        if (this._isAnyLikesBefore()) {
            this._handleLikeClick (
                true,
                this._likesArr,
                this._cardId,
                this._buttonLike,
                this._config.buttonLikeActive,
                this._likesCounter
            )
        } else if (!this._isAnyLikesBefore()) {
            this._handleLikeClick (
            false,
            this._likesArr,
            this._cardId,
            this._buttonLike,
            this._config.buttonLikeActive,
            this._likesCounter
            )
        } else {
            console.log('Произошла ошибка')
        }
    }
    _renderTrashIcon () {
        if (this._cardOwner._id == this._user._id) {
            this._buttonDelete.style.display = "block";
        }
    }
    _renderLikeIcon () {
        if (this._likesArr.some(whoLiked => whoLiked.id === this._user._id)) {
            this._buttonLike.classList.add(this._config.buttonLikeActive);
        }
    }
}
