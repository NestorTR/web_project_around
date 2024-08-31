const overlay = document.getElementById("overlay");
const editButtonOpen = document.getElementById("edit-button-open");
const profileForm = document.getElementById("profile-form");
const editButtonClose = document.getElementById("edit-button-close");
const addButtonOpen = document.querySelector(".profile__add-button");
const addForm = document.getElementById("add-form");
const addButtonClose = document.getElementById("add-button-close");

const profileName = document.getElementById("profile-name");
const profileJob = document.getElementById("profile-job");

const nameInput = document.getElementById("name");
const jobInput = document.getElementById("job");
const saveButtonProfile = profileForm.querySelector("#save-button");

const placeInput = document.getElementById("place");
const urlInput = document.getElementById("url");
const saveButtonAdd = addForm.querySelector("#save-button");

// Mostrar el formulario y overlay
function showForm(form) {
  overlay.style.display = "block";
  form.style.display = "block";
}

// Ocultar el formulario y overlay
function hideForm(form) {
  form.style.display = "none";
  overlay.style.display = "none";
}

// Abrir el formulario de perfil
editButtonOpen.addEventListener("click", function () {
  showForm(profileForm);
});

// Cerrar el formulario de perfil
editButtonClose.addEventListener("click", function () {
  hideForm(profileForm);
});

// Abrir el formulario de agregar lugar
addButtonOpen.addEventListener("click", function () {
  showForm(addForm);
});

// Cerrar el formulario de agregar lugar
addButtonClose.addEventListener("click", function () {
  hideForm(addForm);
});

// Ocultar formularios y el overlay al cargar la página
hideForm(profileForm);
hideForm(addForm);

// Cerrar el formulario cuando se hace clic fuera de él
function setupClickOutside(form) {
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      hideForm(form);
    }
  });

  // Cerrar el formulario con la tecla ESC
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (form.style.display === "block") {
        hideForm(form);
      }
    }
  });
}

// Click fuera del formulario para ambos formularios
setupClickOutside(profileForm);
setupClickOutside(addForm);

// Validación de formularios
function validateForm(inputs, saveButton) {
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.validity.valid) {
      isValid = false;
    }
  });

  saveButton.disabled = !isValid;
}

// Validación del formulario Editar Perfil
profileForm.addEventListener("input", function () {
  validateForm([nameInput, jobInput], saveButtonProfile);
});

// Validación del formulario Nuevo Lugar
addForm.addEventListener("input", function () {
  validateForm([placeInput, urlInput], saveButtonAdd);
});

// Actualizar perfil cuando se guarda el formulario Editar Perfil
profileForm.addEventListener("submit", function (event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  hideForm(profileForm);
});

// LIKE

// Selecciona todos los botones de Like
const likeButtons = document.querySelectorAll(".element__button");

// Agrega un evento 'click' a cada botón de Like
likeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const img = button.querySelector("img");

    if (img.src.includes("Like.png")) {
      img.src = "./images/LikeOn.png";
    } else {
      img.src = "./images/Like.png";
    }
  });
});

// ELIMINAR TARJETA
const deleteButtons = document.querySelectorAll(".element__delete");

// Evento clic a cada botón de eliminar
deleteButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const elementToDelete = event.target.closest(".element");

    elementToDelete.remove();
  });
});

// Función para crear un nuevo elemento
function createNewElement(place, imageUrl) {
  // Crear un nuevo div con la clase "element"
  const newElement = document.createElement("div");
  newElement.className = "element";

  // Crear el botón de eliminar
  const deleteButton = document.createElement("button");
  deleteButton.className = "element__delete";
  deleteButton.innerHTML = '<img src="./images/eliminar.png" alt="Eliminar" />';

  // Crear la imagen
  const image = document.createElement("img");
  image.className = "element__image";
  image.src = imageUrl;
  image.alt = `Imagen de ${place}`;

  // Crear la descripción
  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "element__description";

  const placeName = document.createElement("p");
  placeName.textContent = place;

  // Crear el botón de Like
  const likeButton = document.createElement("button");
  likeButton.className = "element__button";
  likeButton.innerHTML = '<img src="./images/Like.png" alt="Like button" />';

  // Añade el texto y el botón de Like
  descriptionDiv.appendChild(placeName);
  descriptionDiv.appendChild(likeButton);

  // Añade el botón de eliminar, la imagen y la descripción
  newElement.appendChild(deleteButton);
  newElement.appendChild(image);
  newElement.appendChild(descriptionDiv);

  // Agrega el evento de eliminar al nuevo botón
  deleteButton.addEventListener("click", function () {
    newElement.remove();
  });

  return newElement;
}

// Envío del formulario Nuevo Lugar
addForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const place = placeInput.value;
  const imageUrl = urlInput.value;

  // Crear un nuevo elemento
  const newElement = createNewElement(place, imageUrl);

  // Agregar el nuevo elemento
  const elementsContainer = document.querySelector(".elements");
  elementsContainer.appendChild(newElement);

  placeInput.value = "";
  urlInput.value = "";

  saveButtonAdd.disabled = true;

  hideForm(addForm);
});
