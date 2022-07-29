import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor (popupConfig, config, handleSumbitForm) {
        super(popupConfig, config);
        this._handleSubmitForm = handleSumbitForm;
        this._popup = document.querySelector(popupConfig);
        this._form = this._popup.querySelector(config.form);
        this._inputlist = Array.from(this._form.querySelectorAll(selectors.input));
    }
    _getInputValues () {
        this._inputObj = {};
         this._inputlist.forEach(input => {
            this._inputObj[input.name] = input.value;
         });
         return this._inputValues = [this._inputObj];
    }
    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._getInputValues();
            this._handleSubmitForm(this._inputValues);
            this.close();
        })
    }
    close () {
        this._form.reset();
        super.close();
    }
    setInputValues (obj) {
        this._inputlist.forEach(input => {
            input.value = obj[input.name];
        })
    }
}