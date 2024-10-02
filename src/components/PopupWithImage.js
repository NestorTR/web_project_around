import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".image__popup-image");
    this._popupCaption = this._popup.querySelector(".image__popup-description");
  }

  // Sobreescribimos el método open() para mostrar la imagen y su descripción
  open(imageSrc, description) {
    this._popupImage.src = imageSrc;
    this._popupImage.alt = description;
    this._popupCaption.textContent = description;
    super.open(); // Llamamos al método open() del padre
  }
}
