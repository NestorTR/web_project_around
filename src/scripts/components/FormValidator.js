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

  // VALIDACIÓN DE PERFIL
  const nameInput = document.getElementById("name");
  const jobInput = document.getElementById("job");
  const profileSaveButton = document.getElementById("save-button-profile");

  function validateProfileForm() {
    let valid = true;

    // Validación del campo Nombre
    if (!nameInput.checkValidity()) {
      document.getElementById("name-error").textContent =
        nameInput.validationMessage;
      valid = false;
    } else {
      document.getElementById("name-error").textContent = "";
    }

    // Validación del campo Acerca de
    if (!jobInput.checkValidity()) {
      document.getElementById("job-error").textContent =
        jobInput.validationMessage;
      valid = false;
    } else {
      document.getElementById("job-error").textContent = "";
    }

    // Activar o desactivar el botón Guardar
    profileSaveButton.disabled = !valid;
  }

  nameInput.addEventListener("input", validateProfileForm);
  jobInput.addEventListener("input", validateProfileForm);

  profileForm.addEventListener("submit", (e) => {
    if (!profileForm.checkValidity()) {
      e.preventDefault();
      validateProfileForm();
    }
  });

  // VALIDACIÓN DE NUEVO LUGAR
  const placeInput = document.getElementById("place");
  const urlInput = document.getElementById("url");
  const addSaveButton = document.getElementById("save-button-add");

  function validateAddForm() {
    let valid = true;

    // Validación del campo Lugar
    if (!placeInput.checkValidity()) {
      document.getElementById("place-error").textContent =
        placeInput.validationMessage || "Por favor, rellena este campo.";
      valid = false;
    } else {
      document.getElementById("place-error").textContent = "";
    }

    // Validación del campo URL
    const urlPattern =
      /^(https?:\/\/)?([\w\d-]+\.){1,}([a-zA-Z]{2,})(\/[^\s]*)?$/;
    if (!urlPattern.test(urlInput.value)) {
      document.getElementById("url-error").textContent =
        "Por favor, introduce una dirección web válida.";
      valid = false;
    } else {
      document.getElementById("url-error").textContent = "";
    }

    // Activar o desactivar el botón Guardar
    addSaveButton.disabled = !valid;
    addSaveButton.style.backgroundColor = valid ? "black" : "";
  }

  placeInput.addEventListener("input", validateAddForm);
  urlInput.addEventListener("input", validateAddForm);

  addForm.addEventListener("submit", (e) => {
    validateAddForm();

    if (!addForm.checkValidity() || addSaveButton.disabled) {
      e.preventDefault();
    }
  });
});
