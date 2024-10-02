export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    this._submitButton = formElement.querySelector(config.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    if (!inputElement.validity.valid) {
      errorElement.textContent = this._getErrorMessage(inputElement);
      inputElement.classList.add(this._config.inputErrorClass);
    } else {
      errorElement.textContent = "";
      inputElement.classList.remove(this._config.inputErrorClass);
    }
  }

  _getErrorMessage(inputElement) {
    if (inputElement.validity.valueMissing) {
      return "Este campo es obligatorio.";
    }
    if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
      return `El campo debe tener entre ${inputElement.minLength} y ${inputElement.maxLength} caracteres.`;
    }
    if (inputElement.validity.typeMismatch && inputElement.type === "url") {
      return "Por favor, introduce una URL válida.";
    }
    return inputElement.validationMessage;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._config.inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }
}
