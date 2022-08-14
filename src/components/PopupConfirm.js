import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelector, config, handleSubmitForm) {
    super(popupSelector, config);
    this._form = this._popup.querySelector(config.form); 
    this._handleSubmitForm = handleSubmitForm;
    this._buttonSubmit = this._popup.querySelector(
      this._config.submitButtonSelector
    );
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
  showLoader(isLoad, text) {
    if (isLoad) {
      this._buttonSubmit.textContent = text;
      this._buttonSubmit.disabled = true;
      this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonSubmit.textContent = this._buttonSubmit.textContent;
      this._buttonSubmit.disabled = false;
      this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
    }
  }
  removeItem() {
    this._cardElement.remove();
  }
}