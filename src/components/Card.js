export default class Card {
  constructor(data, handleCardClick, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick; // Función para manejar clic en la tarjeta
    this._cardSelector = cardSelector; // Selector del template
  }

  // Método para obtener la plantilla de la tarjeta
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  // Método para crear la tarjeta
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__title");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // Agregar evento de clic para abrir el popup con la imagen
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });

    return this._element;
  }
}
