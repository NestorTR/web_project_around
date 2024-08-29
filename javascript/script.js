// Selectores para el diálogo 'edit'
const editButtonOpen = document.querySelector("#edit-button-open");
const editButtonClose = document.querySelector("#edit-button-close");
const profileEdit = document.querySelector("#edit");
const profileNameElement = document.getElementById("profile-name");
const profileJobElement = document.getElementById("profile-job");

editButtonOpen.addEventListener("click", () => {
  inputFieldName.value = profileNameElement.textContent;
  inputFieldJob.value = profileJobElement.textContent;

  toggleSaveButton();

  profileEdit.show();
  document.querySelector(".header").style.opacity = "0.5";
  document.querySelector(".profile").style.opacity = "0.5";
  document.querySelector(".elements").style.opacity = "0.5";
  document.querySelector(".footer").style.opacity = "0.5";
});

editButtonClose.addEventListener("click", () => {
  profileEdit.close();
  document.querySelector(".header").style.opacity = "1";
  document.querySelector(".profile").style.opacity = "1";
  document.querySelector(".elements").style.opacity = "1";
  document.querySelector(".footer").style.opacity = "1";
});

let inputFieldName = document.querySelector(".profile__edit-form-input_name");
let inputFieldJob = document.querySelector(".profile__edit-form-input_job");
let saveButton = document.getElementById("save-button");

function toggleSaveButton() {
  if (inputFieldName.value.trim() !== "" && inputFieldJob.value.trim() !== "") {
    saveButton.style.backgroundColor = "black";
    saveButton.style.color = "white";
  } else {
    saveButton.style.backgroundColor = "transparent";
    saveButton.style.color = "#c4c4c4";
  }
}
inputFieldName.addEventListener("input", toggleSaveButton);
inputFieldJob.addEventListener("input", toggleSaveButton);
toggleSaveButton();

let formElement = document.querySelector("#profile-form");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.getElementById("name");
  let jobInput = document.getElementById("job");

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  let profileName = document.querySelector("#profile-name");
  let profileJob = document.querySelector("#profile-job");

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  profileEdit.close();
  document.querySelector(".header").style.opacity = "1";
  document.querySelector(".profile").style.opacity = "1";
  document.querySelector(".elements").style.opacity = "1";
  document.querySelector(".footer").style.opacity = "1";
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// Botón Like

document.querySelectorAll(".element__button").forEach((button) => {
  button.addEventListener("click", function () {
    const img = this.querySelector("img");

    if (img.src.includes("LikeOn.png")) {
      img.src = "./images/Like.png";
    } else {
      img.src = "./images/LikeOn.png";
    }
  });
});

// Botón agregar

let addButtonOpen = document.querySelector(".profile__add-button");
let addDialog = document.querySelector("#add");

addButtonOpen.addEventListener("click", () => {
  addDialog.show();
  document.querySelector(".header").style.opacity = "0.5";
  document.querySelector(".profile").style.opacity = "0.5";
  document.querySelector(".elements").style.opacity = "0.5";
  document.querySelector(".footer").style.opacity = "0.5";
});

let addButtonClose = document.querySelector("#add-button-close");

addButtonClose.addEventListener("click", () => {
  addDialog.close();
  document.querySelector(".header").style.opacity = "1";
  document.querySelector(".profile").style.opacity = "1";
  document.querySelector(".elements").style.opacity = "1";
  document.querySelector(".footer").style.opacity = "1";
});

let inputFieldPlace = document.querySelector(".profile__add-form-input_place");
let inputFieldUrl = document.querySelector(".profile__add-form-input_url");
let addSaveButton = addDialog.querySelector(".profile__add-form-button_save");

function toggleAddSaveButton() {
  if (
    inputFieldPlace.value.trim() !== "" &&
    inputFieldUrl.value.trim() !== ""
  ) {
    addSaveButton.style.backgroundColor = "black";
    addSaveButton.style.color = "white";
  } else {
    addSaveButton.style.backgroundColor = "transparent";
    addSaveButton.style.color = "#c4c4c4";
  }
}

inputFieldPlace.addEventListener("input", toggleAddSaveButton);
inputFieldUrl.addEventListener("input", toggleAddSaveButton);
toggleAddSaveButton();

// Botón de eliminar tarjetas

let deleteButtons = document.querySelectorAll(".element__delete");

deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let element = button.closest(".element");
    element.remove();
  });
});

// Botón agregar

let elementsContainer = document.querySelector(".elements");
let addForm = document.querySelector("#add-form");

// Función para manejar la adición de una nueva tarjeta
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  let placeValue = inputFieldPlace.value.trim();
  let urlValue = inputFieldUrl.value.trim();

  // Esto creará una nueva tarjeta element
  let newElement = document.createElement("div");
  newElement.classList.add("element");

  // Codigo para la nueva tarjeta que será agregada *No se muestra la imagen aaaaaaaaaaaaaaaahhhhh*

  newElement.innerHTML = `
    <button class="element__delete">
      <img src="./images/eliminar.png" alt="Eliminar" />
    </button>
    <img src="${urlValue}" alt="${placeValue}" class="element__image" />
    <div class="element__description">
      <p>${placeValue}</p>
      <button class="element__button">
        <img src="./images/Like.png" alt="Like button" />
      </button>
    </div>
  `;

  // Pondrá el nuevo elemento al principio
  elementsContainer.insertBefore(newElement, elementsContainer.firstChild);

  // Esto gregara el botón eliminar en la nueva tarjeta
  newElement.querySelector(".element__delete").addEventListener("click", () => {
    newElement.remove();
  });

  addDialog.close();
  addForm.reset();
  toggleAddSaveButton();

  document.querySelector(".header").style.opacity = "1";
  document.querySelector(".profile").style.opacity = "1";
  document.querySelector(".elements").style.opacity = "1";
  document.querySelector(".footer").style.opacity = "1";
}

addForm.addEventListener("submit", handleAddFormSubmit);

// Abrir imagen *Aún faltan detalles :( *

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".element__image");
  const imagePopup = document.getElementById("image-popup");
  const popupImage = document.querySelector(".image-popup__image");
  const popupDescription = document.querySelector(".image-popup__description");
  const closeButton = document.getElementById("image-popup-close");

  images.forEach(function (image) {
    image.addEventListener("click", function () {
      popupImage.src = this.src;
      popupImage.alt = this.alt;
      const description = this.closest(".element").querySelector(
        ".element__description p"
      ).textContent;
      popupDescription.textContent = description;
      imagePopup.showModal();
    });
  });

  closeButton.addEventListener("click", function () {
    imagePopup.close();
    popupImage.src = "";
    popupDescription.textContent = "";
  });
});

const closeButton = document.getElementById("closeButton");

imagePopup.addEventListener("close", function () {
  closeButton.style.display = "none";
});

imagePopup.addEventListener("show", function () {
  closeButton.style.display = "block";
});

// Cerrar fuera y esc

// Función para cerrar el diálogo al hacer clic fuera de él
function closeOnClickOutside(dialog) {
  window.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.close();
      resetOpacity();
    }
  });
}

// Función para cerrar el diálogo al presionar la tecla Esc
function closeOnEscape(dialog) {
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && dialog.open) {
      dialog.close();
      resetOpacity();
    }
  });
}

// Función para restablecer la opacidad
function resetOpacity() {
  document.querySelector(".header").style.opacity = "1";
  document.querySelector(".profile").style.opacity = "1";
  document.querySelector(".elements").style.opacity = "1";
  document.querySelector(".footer").style.opacity = "1";
}

const dialogs = [profileEdit, addDialog, imagePopup];

dialogs.forEach((dialog) => {
  closeOnClickOutside(dialog);
  closeOnEscape(dialog);
});
