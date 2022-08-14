import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, config, handleSumbitForm) {
    super(popupSelector, config);
    this._handleSubmitForm = handleSumbitForm;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector(config.form);
    this._inputlist = Array.from(this._form.querySelectorAll(config.input));
    this._buttonSubmit = this._popup.querySelector(
      this._config.submitButtonSelector
    );
  }
  _getInputValues() {
    const inputObj = {};
    this._inputlist.forEach((input) => {
      inputObj[input.name] = input.value;
    });
    return inputObj;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }
  close() {
    this._form.reset();
    super.close();
  }
  setInputValues(obj) {
    this._inputlist.forEach((input) => {
      input.value = obj[input.name];
    });
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
}
