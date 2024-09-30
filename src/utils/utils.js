const imagePopupForm = document.getElementById("image-popup");
const popupImage = imagePopupForm.querySelector(".image__popup-image");
const popupDescription = imagePopupForm.querySelector(
  ".image__popup-description"
);
const closePopupButton = imagePopupForm.querySelector("#image-popup-close");

// Función para abrir el popup con la imagen seleccionada
function openPopup(imageSrc, description) {
  popupImage.src = imageSrc;
  popupDescription.textContent = description;
  imagePopupForm.style.display = "flex";
}

// Función para cerrar el popup
function closePopup() {
  imagePopupForm.style.display = "none";
}

// Agregar evento al botón de cerrar
closePopupButton.addEventListener("click", closePopup);

// Agregar eventos a las imágenes
const images = document.querySelectorAll(".element__image");
images.forEach((img) => {
  img.addEventListener("click", (event) => {
    const description =
      event.target.nextElementSibling.querySelector("p").textContent;
    openPopup(event.target.src, description);
  });
});

// Cerrar el popup cuando se haga clic fuera de la imagen
imagePopupForm.addEventListener("click", (event) => {
  if (event.target === imagePopupForm) {
    closePopup();
  }
});

// Función para manejar el evento de la tecla ESC
function handleEscKey(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

// Agregar evento de teclado para la tecla ESC
document.addEventListener("keydown", handleEscKey);
