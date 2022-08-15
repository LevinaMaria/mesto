export class Card {
  constructor(
    config,
    item,
    handleCardClick,
    handleLikeClick,
    popupConfirm,
    user
  ) {
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

  _getTemplate() {
    this._element = document
      .querySelector(this._config.templateElement)
      .content.querySelector(this._config.card)
      .cloneNode(true);
    return this._element;
  }

  createCard() {
    this._getTemplate();
    this._element.querySelector(this._config.title).textContent = this._name;
    this._image = this._element.querySelector(this._config.image);
    this._likesCounter = this._element.querySelector(this._config.likesCounter);
    this._likesCounter.textContent = this._likesArr.length;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setListeners();
    this._renderTrashIcon();
    this._renderLikeIcon();
 
    return this._element;
  }

  _handlePopupImage() {
    this._handleCardClick(this._name, this._link);
  }
  _setLike(isLiked) {
    if (isLiked) {
      this._buttonLike.classList.add(this._config.buttonLikeActive);
    } else {
      this._buttonLike.classList.remove(this._config.buttonLikeActive);
    }
  }
  _updateLikesWiev () {
    this._isLiked = this._likesArr.some((like) => like._id === this._user._id);
    this._setLike(this._isLiked);
    this._likesCounter.textContent = this._likesArr.length;
  }
  updateLikes(likes) {
      this._likesArr = likes;
      this._updateLikesWiev();
  }

  _setListeners() {
    this._buttonLike = this._element.querySelector(this._config.buttonLike);
    this._buttonDelete = this._element.querySelector(this._config.buttonDelete);
    this._buttonDelete.addEventListener("click", () => {
      this._popupConfirm.open(this._cardId, this._element);
    });
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick(this._cardId, this._isLiked, this.updateLikes.bind(this))
    });
    this._image.addEventListener("click", () => this._handlePopupImage());
  }
  _renderTrashIcon() {
    if (this._cardOwner._id == this._user._id) {
      this._buttonDelete.style.display = "block";
    }
  }
  _renderLikeIcon() {
    if (this._likesArr.some((whoLiked) => whoLiked.id === this._user._id)) {
      this._buttonLike.classList.add(this._config.buttonLikeActive);
    }
  }
}
