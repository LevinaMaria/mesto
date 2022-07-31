import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (popupConfig, config) {
        super (popupConfig, config);
        this._imageView = this._popup.querySelector(this._config.imageView);
        this._imageViewTitle = this._popup.querySelector(this._config.imageViewTitle);
    };
    open (name, link) {
        this._imageView.src = link;
        this._imageView.alt = name;
        this._imageViewTitle.textContent = name;
        super.open();
    };
};