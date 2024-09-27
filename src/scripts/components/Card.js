class Card {
  constructor(data, templateSelector) {
    this._text = data.text;
    this._imageUrl = data.imageUrl;
    this._templateSelector = templateSelector;

    this._element = this._getTemplate();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".element__button")
      .addEventListener("click", () => {
        this._handleLikeCard();
      });
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {
    const likeIcon = this._element.querySelector(".element__button img");
    if (likeIcon.src.includes("Like.png")) {
      likeIcon.src = "./images/LikeOn.png";
    } else {
      likeIcon.src = "./images/Like.png";
    }
  }

  generateCard() {
    this._element.querySelector(".element__image").src = this._imageUrl;
    this._element.querySelector(".element__image").alt = this._text;
    this._element.querySelector(".element__description p").textContent =
      this._text;

    this._setEventListeners();

    return this._element;
  }
}

const initialCards = [
  { text: "Austria", imageUrl: "./images/ImagenUno.jpg" },
  { text: "Noruega", imageUrl: "./images/ImagenDos.jpg" },
  { text: "Arabia", imageUrl: "./images/ImagenTres.jpg" },
  { text: "Suiza", imageUrl: "./images/ImagenCuatro.jpg" },
  { text: "Tahití", imageUrl: "./images/ImagenCinco.jpg" },
  { text: "Canadá", imageUrl: "./images/ImagenSeis.jpg" },
];

const cardContainer = document.querySelector(".elements");

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.generateCard();
  cardContainer.appendChild(cardElement);
});
