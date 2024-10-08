export default class FormValidator {
  constructor(formElement) {
    this._formElement = formElement;
  }

  enableValidation() {
    this._setEventListener(this._formElement);
  }
  _setEventListener(formElements) {
    const inputElement = Array.from(
      formElements.querySelectorAll(".popup__info")
    );
    const submitButton = formElements.querySelector("[type=submit]");
    this._toggleSubmitButton(inputElement, submitButton);
    inputElement.forEach((inputsElements) => {
      inputsElements.addEventListener("input", (event) => {
        if (!inputsElements.validity.valid) {
          inputsElements.classList.add("form__input_type_error");
          this._showErrorMessage(formElements, inputsElements);
        } else {
          inputsElements.classList.remove("form__input_type_error");
          this._hideErrorMessage(formElements, inputsElements);
        }
        this._toggleSubmitButton(inputElement, submitButton);
      });
    });
  }
  _showErrorMessage(formElements, inputsElements) {
    const errorNode = formElements.querySelector(
      `.popup__error_${inputsElements.name}`
    );

    errorNode.textContent = inputsElements.validationMessage;
  }
  _hideErrorMessage(formElements, inputsElements) {
    const errorNode = formElements.querySelector(
      `.popup__error_${inputsElements.name}`
    );
    errorNode.textContent = "";
  }
  _toggleSubmitButton(inputElement, submitButton) {
    const state = this._isFormValid(inputElement);
    if (!state) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }
  _isFormValid(inputElement) {
    return inputElement.every((item) => {
      return item.validity.valid;
    });
  }
}
