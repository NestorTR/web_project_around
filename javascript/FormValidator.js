// Clase FormValidator
class FormValidator {
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
      errorElement.textContent = inputElement.validationMessage;
    } else {
      errorElement.textContent = "";
    }
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

// Objeto de configuración para la validación de formularios
const formValidationConfig = {
  inputSelector: ".profile__edit-form-input",
  submitButtonSelector: ".profile__edit-form-button_save",
  inactiveButtonClass: "profile__edit-form-button_disabled",
  inputErrorClass: "error-message",
  errorClass: "form__input-error_active",
};

document.addEventListener("DOMContentLoaded", () => {
  // Instancia para el formulario de editar perfil
  const profileForm = document.getElementById("profile-form");
  const profileFormValidator = new FormValidator(
    formValidationConfig,
    profileForm
  );
  profileFormValidator.enableValidation();

  // Instancia para el formulario de nuevo lugar
  const addForm = document.getElementById("add-form");
  const addFormValidator = new FormValidator(formValidationConfig, addForm);
  addFormValidator.enableValidation();
});
