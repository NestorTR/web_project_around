import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(".modalImage__open");
    this._popupTitle = this._popupElement.querySelector(
      ".modalImage__description"
    );
  }
  open(name, link) {
    this._popupImage.src = link;
    this._popupTitle.textContent = name;
    super.open();
  }
}
