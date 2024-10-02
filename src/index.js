import {
  showForm,
  hideForm,
  setupClickOutside,
  openPopup,
  closePopup,
  handleEscKey,
} from "./utils/utils.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import Card from "./components/Card.js";

// Inicializar clase Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, handleCardClick, "#card-template");
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".elements"
);

// Renderizar los elementos iniciales
cardSection.renderItems();

// Inicializar PopupWithImage
const imagePopup = new PopupWithImage("#image-popup");

// Función para manejar el clic en las tarjetas
function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

// Inicializar PopupWithForm
const editProfilePopup = new PopupWithForm("#profile-popup", (formData) => {
  userInfo.setUserInfo(formData);
  editProfilePopup.close();
});

// Inicializar UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

// Configurar event listeners para los popups
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
const overlay = document.getElementById("overlay");
const editButtonOpen = document.getElementById("edit-button-open");
const profileForm = document.getElementById("profile-form");
const editButtonClose = document.getElementById("edit-button-close");
const addButtonOpen = document.querySelector(".profile__add-button");
const addForm = document.getElementById("add-form");
const addButtonClose = document.getElementById("add-button-close");
const imagePopupForm = document.getElementById("image-popup");
const popupImage = imagePopupForm.querySelector(".image__popup-image");
const popupDescription = imagePopupForm.querySelector(
  ".image__popup-description"
);
const closePopupButton = imagePopupForm.querySelector("#image-popup-close");

// Abrir el formulario Editar Perfil
editButtonOpen.addEventListener("click", function () {
  showForm(profileForm, overlay);
});

// Cerrar el formulario Editar Perfil
editButtonClose.addEventListener("click", function () {
  hideForm(profileForm, overlay);
});

// Abrir el formulario Nuevo Lugar
addButtonOpen.addEventListener("click", function () {
  showForm(addForm, overlay);
});

// Cerrar el formulario Nuevo Lugar
addButtonClose.addEventListener("click", function () {
  hideForm(addForm, overlay);
});

// Cerrar ambos formularios dando click fuera de ellos
setupClickOutside(profileForm, overlay);
setupClickOutside(addForm, overlay);

// Eventos para el popup de imagen
const images = document.querySelectorAll(".element__image");
images.forEach((img) => {
  img.addEventListener("click", (event) => {
    const description =
      event.target.nextElementSibling.querySelector("p").textContent;
    openPopup(
      imagePopupForm,
      popupImage,
      popupDescription,
      event.target.src,
      description
    );
  });
});

// Agregar evento al botón de cerrar popup de imagen
closePopupButton.addEventListener("click", function () {
  closePopup(imagePopupForm);
});

// Cerrar el popup al hacer clic fuera de la imagen
imagePopupForm.addEventListener("click", function (event) {
  if (event.target === imagePopupForm) {
    closePopup(imagePopupForm);
  }
});

// Cerrar el popup de imagen con la tecla ESC
document.addEventListener("keydown", function (event) {
  handleEscKey(event, imagePopupForm);
});
