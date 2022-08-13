export class Popup {
    constructor (popupSelector, config) {
      this._popup = document.querySelector(popupSelector);
      this._config = config;
      this._handleEscClose = this._handleEscClose.bind(this);
      this._buttonSubmit = this._popup.querySelector(this._config.submitButtonSelector);
    }
    open () {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add(this._config.opened);
    }
    close () {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.classList.remove(this._config.opened);
    }
    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
          this.close();
        }
    }
    setEventListeners () {
        this._popup.addEventListener('click', (evt) => {
          if (evt.target.classList.contains(this._config.buttonClosePopup) || evt.target === evt.currentTarget) {
            this.close();
          };
        });
    }
    showLoader (isLoad, text) {
      if (isLoad) {
        this._buttonSubmit.textContent = text;
        this._buttonSubmit.disabled = true;
        this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
      } else {
        this._buttonSubmit.textContent = this._buttonSubmit.value;
        this._buttonSubmit.disabled = false;
        this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
      }
    }
}