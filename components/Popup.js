export class Popup {
    constructor (popupSelector, config) {
      this._popup = document.querySelector(popupSelector);
      this._config = config;
      this._handleEscClose = this._handleEscClose.bind(this);
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
}