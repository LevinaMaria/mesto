export class Popup {
    constructor (popupConfig, config) {
      this._popup = document.querySelector(popupConfig);
      this._config = config;
    }
    open () {
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        this._popup.classlist.add(this._config)
    }
    close () {
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        this._popup.classlist.remove(this._config)
    }
    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
          this.close();
        }
    }
    setEventListeners () {
        this._popup.addEventListener('click', (evt) => {
          const popupArea = this._popup.querySelector(this._config.area);
          if (evt.target.classList.contains(this._config.buttonClosed) || !popupArea.contains(evt.target)) {
            this.close();
          };
        });
    }
}