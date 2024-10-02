// utils.js

// Función para mostrar el formulario (modal)
export function showForm(form, overlay) {
  overlay.style.display = "block";
  form.style.display = "block";
}

// Función para ocultar el formulario (modal)
export function hideForm(form, overlay) {
  form.style.display = "none";
  overlay.style.display = "none";
}

// Función para configurar el cierre al hacer clic fuera del formulario
export function setupClickOutside(form, overlay) {
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      hideForm(form, overlay);
    }
  });

  // Cerrar el formulario con la tecla ESC
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (form.style.display === "block") {
        hideForm(form, overlay);
      }
    }
  });
}

// Función para abrir el popup de la imagen
export function openPopup(
  imagePopupForm,
  popupImage,
  popupDescription,
  imageSrc,
  description
) {
  popupImage.src = imageSrc;
  popupDescription.textContent = description;
  imagePopupForm.style.display = "flex";
}

// Función para cerrar el popup de la imagen
export function closePopup(imagePopupForm) {
  imagePopupForm.style.display = "none";
}

// Función para manejar la tecla ESC para cerrar el popup de imagen
export function handleEscKey(event, imagePopupForm) {
  if (event.key === "Escape") {
    closePopup(imagePopupForm);
  }
}
