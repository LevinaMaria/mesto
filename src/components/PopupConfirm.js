import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelector, config, handleSubmitForm) {
    super(popupSelector, config);
    this._form = this._popup.querySelector(config.form); 
    this._handleSubmitForm = handleSubmitForm;
  }
  open (cardId, cardElement) {
    super.open()
    this._cardId = cardId;
    this._cardElement = cardElement;
  }
  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmitForm(this._cardId, this._cardElement);
    })
  }
}