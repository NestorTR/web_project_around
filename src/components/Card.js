import { openImagePopup } from "../utils/utils.js";

export default class Card {
  constructor(name, link, template, { handleCardClick }) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".elements-card__element_image").src =
      this._link;
    this._element.querySelector(".elements-name__place").textContent =
      this._name;
    this._setEventListeners();
    return this._element;
  }

  _handlerOpenPopup() {
    openImagePopup(this._name, this._link);
  }

  _handlerLike() {
    this._element
      .querySelector(".elements-name__place_like")
      .classList.toggle("elements-name__place_like_active");
  }
  _handleRemove() {
    this.removeCard = this._element.remove();
  }
  _setEventListeners() {
    this._element
      .querySelector(".elements-card__element_image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });

    this._element
      .querySelector(".elements-card__element_trash")
      .addEventListener("click", () => {
        this._handleRemove();
      });

    this._element
      .querySelector(".elements-name__place_like")
      .addEventListener("click", () => {
        this._handlerLike();
      });
  }
}
