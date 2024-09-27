// EDITAR PERFIL

document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("profile-form");
  const nameInput = document.getElementById("name");
  const jobInput = document.getElementById("job");
  const saveButton = document.getElementById("save-button");

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
    saveButton.disabled = !valid;
  }

  // Añadir eventos para la validación en tiempo real
  nameInput.addEventListener("input", validateProfileForm);
  jobInput.addEventListener("input", validateProfileForm);

  // Validar el formulario al enviar
  profileForm.addEventListener("submit", (e) => {
    if (!profileForm.checkValidity()) {
      e.preventDefault();
      validateProfileForm();
    }
  });
});

// NUEVO LUGAR

document.addEventListener("DOMContentLoaded", () => {
  const addForm = document.getElementById("add-form");
  const placeInput = document.getElementById("place");
  const urlInput = document.getElementById("url");
  const saveButton = document.getElementById("save-button");

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
    saveButton.disabled = !valid;
    saveButton.style.backgroundColor = valid ? "black" : "";
  }

  placeInput.addEventListener("input", validateAddForm);
  urlInput.addEventListener("input", validateAddForm);

  // Validar el formulario al enviar
  addForm.addEventListener("submit", (e) => {
    validateAddForm();

    if (!addForm.checkValidity() || saveButton.disabled) {
      e.preventDefault();
    }
  });
});
