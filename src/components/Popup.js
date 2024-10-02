export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); // Selecciona el popup por el selector
    this._handleEscClose = this._handleEscClose.bind(this); // Bind para el método privado
  }

  // Método público para abrir el popup
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose); // Agrega listener para ESC
  }

  // Método público para cerrar el popup
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose); // Remueve listener para ESC
  }

  // Método privado para manejar el cierre con la tecla Esc
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  // Método público para agregar event listeners
  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("popup__close") ||
        event.target === this._popup
      ) {
        this.close();
      }
    });
  }
}
