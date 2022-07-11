export default class Card {
    constructor(card) {
        this._card = card.name;
        this._link = card.link;
        this._templateSelector = templateSelector;
        this._viewPopupImage = viewPopupImage;
    }
    _getTemplate(name, link){
        const cardElement = templateElement.cloneNode(true); // клонируем темплейт
        const cardCaption = cardElement.querySelector(".element__caption"); // данные подписи картинки
        const cardImage = cardElement.querySelector(".element__image"); // данные картинки
        cardCaption.textContent = name;
        cardImage.src = link;
        cardImage.alt = name;
    }
};
