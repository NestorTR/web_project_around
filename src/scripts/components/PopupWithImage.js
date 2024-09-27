class PopupWithImage extends Popup {
  open({ imageSrc, caption }) {
    const popupImage = this._popup.querySelector(".popup__image");
    const popupCaption = this._popup.querySelector(".popup__caption");

    popupImage.src = imageSrc;
    popupImage.alt = caption;
    popupCaption.textContent = caption;

    super.open();
  }
}
