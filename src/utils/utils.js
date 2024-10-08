import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
export const modal = document.getElementById("ventana_modal");
export const boton = document.getElementById("btn_open_modal"); //boton que abre el modal
export const cerrar = document.getElementById("btn_close_modal"); //boton que cierra el modal
export const modalImage = document.querySelector(".modalImage");
export const modalAdd = document.querySelector("#ventana_modal-add");
export const btnAdd = document.querySelector(".profile__button-add");
export const btnClose = document.querySelector("#btn_close_modal-add");
export const profileName = document.querySelector(".profile-info__avatar_name");
export const profileAbout = document.querySelector(
  ".profile-info__avatar_ocupation"
);
export const popupCard = document.querySelector(".modalImage");
export const inputName = document.querySelector("#input_name");
export const inputAbout = document.querySelector("#input_about");
const popupImage = new PopupWithImage(".modalImage");

export function openImagePopup(name, link) {
  const Image = document.querySelector(".modalImage");
  const closeImage = document.querySelector(".modalImage__close");
  const openImage = document.querySelector(".modalImage__open");
  const titleImage = document.querySelector(".modalImage__description");
  Image.style.display = "block";
  openImage.src = link;
  titleImage.textContent = name;
  closeImage.addEventListener("click", function (evt) {
    Image.style.display = "none";
  });
}

export function cardGenerator(name, link) {
  const card = new Card(name, link, ".template-card", {
    handleCardClick: () => {
      popupImage.open(name, link);
    },
  });
  return card.generateCard();
}
