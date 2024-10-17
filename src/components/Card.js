// Crear tarjetas iniciales

export class Card {
  constructor(
    cardData,
    cardSelector,
    user,
    { handleCardClick, handleDeleteCard, handleAddLike, handleRemoveLike }
  ) {
    this._cardData = cardData;
    this._src = cardData.link;
    this._alt = `imagen de ${cardData.name}`;
    this._text = cardData.name;
    this._user = user;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._handleCardClick(this._src, this._text);
      });

    this._element
      .querySelector(".element__button-heart")
      .addEventListener("click", (evt) => {
        this._handleLikeCard(evt);
      });

    this._element
      .querySelector(".element__button-trash")
      .addEventListener("click", (evt) => {
        this._handleDeleteCard(this._cardData._id, () => {
          this._element.remove();
        });
      });
  }

  // Boton Like

  _handleLikeCard(evt) {
    const counter = this._element.querySelector(".element__counter");

    // Quitar Like

    if (this._cardData.likes.some((like) => like._id === this._user._id)) {
      this._handleRemoveLike(this._cardData._id).then((card) => {
        this._cardData = card;
        evt.target.classList.remove("element__button-heart_active");
        counter.textContent = this._cardData.likes.length;
      });
    } else {
      // Agregar like

      this._handleAddLike(this._cardData._id).then((card) => {
        this._cardData = card;
        evt.target.classList.add("element__button-heart_active");
        counter.textContent = this._cardData.likes.length;
      });
    }
  }

  // Eliminar tarjeta

  _handleDeleteCard(evt) {
    this._element.remove();
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__photo").src = this._src;
    this._element.querySelector(".element__photo").alt = this._alt;
    this._element.querySelector(".element__text").textContent = this._text;

    const trashButton = this._element.querySelector(".element__button-trash");
    const likeButton = this._element.querySelector(".element__button-heart");

    //Si no es mi id, no se muestra el boton para eliminarla

    if (this._user._id !== this._cardData.owner._id) {
      trashButton.remove();
    }

    // Verificar si el usuario actual ya dió Like a la tarjeta, de ser así el Like estará activo

    if (this._cardData.likes.some((like) => like._id === this._user._id)) {
      likeButton.classList.add("element__button-heart_active");
      const counter = this._element.querySelector(".element__counter");
      counter.textContent = this._cardData.likes.length;
    }

    return this._element;
  }
}
