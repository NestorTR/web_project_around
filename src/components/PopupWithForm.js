import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // Callback para el submit
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  // Método privado para obtener los valores de los inputs
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  // Sobreescribimos el método setEventListeners() para manejar el submit
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues()); // Llamada al callback con los valores
    });
  }

  // Sobreescribimos el método close() para reiniciar el formulario
  close() {
    super.close();
    this._form.reset(); // Reinicia el formulario
  }
}
