export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscCloseAux = this._handleEscClose.bind(this);
    this.setEventListeners();
  }
  open() {
    this._popupElement.style.display = "block";
    window.addEventListener("keydown", this._handleEscCloseAux);
  }
  close() {
    this._popupElement.style.display = "none";
    window.removeEventListener("keydown", this._handleEscCloseAux);
  }
  _handleEscClose(evt) {
    //Cerrar modal con tecla ESC

    const esc = evt.keyCode || evt.which;
    if (esc == 27) {
      this.close();
    }
  }
  setEventListeners() {
    //Cerrar el modal en superposicion

    this._popupElement
      .querySelector(".popup__close, .popup__close-add, .modalImage__close")
      .addEventListener("click", () => {
        this.close();
      });

    this._popupElement.addEventListener("click", (e) => {
      if (
        e.target == this._popupElement ||
        e.target.classList.contains("modalImage__content")
      ) {
        this.close();
      }
    });
  }
}
