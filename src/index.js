import "./pages/index.css";
import { Card } from "./components/Card.js";
import {
  cardContainer,
  formConfig,
  popUpImage,
  popUpCard,
  ButtonAddCard,
  popUpProfile,
  openButton,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  popUpConfirmation,
  popUpAvatar,
  avatarImage,
} from "./utils/utils.js";
import { FormValidator } from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";
import UserInfo from "./components/UserInfo.js";
import api from "./components/Api.js";

const avatarNode = document.querySelector(".profile__avatar");

let currentUser = null;
let cardList = null;

const userInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileJob,
});

// Información del Usuario
api.getUserInfo().then((user) => {
  currentUser = user;
  userInfo.setUserInfo({ name: user.name, job: user.about });
  avatarNode.src = user.avatar;
  // Crear las tarjetas iniciales
  api.getInitialCards().then((cards) => {
    console.log(cards);
    cardList = new Section(
      {
        items: cards,
        renderer: (cardItem) => {
          const card = new Card(cardItem, "#card__template", currentUser, {
            handleCardClick: (src, text) =>
              popupImage.open({
                link: src,
                name: text,
              }),
            handleDeleteCard: (cardId, callback) => {
              deleteForm.open(() => {
                api.deleteCard(cardId).then(() => {
                  callback();
                });
              });
            },
            handleAddLike: (cardId) => {
              return api.addCardLike(cardId);
            },

            handleRemoveLike: (cardId) => {
              return api.deleteCardLike(cardId);
            },
          });

          const cardElement = card.createCard();

          cardList.addItem(cardElement);
        },
      },
      cardContainer
    );

    // Renderizar tarjetas iniciales en el DOM
    cardList.renderItems();
  });
});

// Popup de confirmación para eliminar las tarjeta
const deleteForm = new PopupWithConfirmation({
  popupSelector: popUpConfirmation,
});
deleteForm.setEventListeners();

// Popup imagen
const popupImage = new PopupWithImage({
  popupSelector: popUpImage,
});
popupImage.setEventListeners();

// Agregar tarjetas
const addCard = new PopupWithForm({
  popupSelector: popUpCard,
  handleFormSubmit: (formData) => {
    return api.createCard(formData.link, formData.title).then((card) => {
      const newCardInstance = new Card(card, "#card__template", currentUser, {
        handleCardClick: (src, text) =>
          popupImage.open({
            link: src,
            name: text,
          }),
        handleDeleteCard: (cardId, callback) => {
          deleteForm.open(() => {
            api.deleteCard(cardId).then(() => {
              callback();
            });
          });
        },
        handleAddLike: (cardId) => {
          return api.addCardLike(cardId);
        },

        handleRemoveLike: (cardId) => {
          return api.deleteCardLike(cardId);
        },
      });

      const newcardElement = newCardInstance.createCard();

      cardContainer.prepend(newcardElement);
    });
  },
});
ButtonAddCard.addEventListener("click", () => {
  enableValidation(formConfig);
  addCard.open();
});
addCard.setEventListeners();

// Editar perfil
const editProfile = new PopupWithForm({
  popupSelector: popUpProfile,
  handleFormSubmit: (inputValues) => {
    return api
      .updateUserProfile(inputValues.name, inputValues.about)
      .then((user) => {
        userInfo.setUserInfo({ name: user.name, job: user.about });
        //editProfile.close();
      });
  },
});
openButton.addEventListener("click", () => {
  enableValidation(formConfig);
  editProfile.open();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
});
editProfile.setEventListeners();

// Actualizar foto de perfil
const avatarForm = new PopupWithForm({
  popupSelector: popUpAvatar,
  handleFormSubmit: (inputValues) => {
    return api
      .updateAvatar(inputValues.link)
      .then((user) => {
        // Actualiza el DOM con la nueva imagen del avatar
        document.querySelector(".profile__avatar").src = user.avatar;
        //avatarForm.close();
      })
      .catch((err) => console.error(err));
  },
});

avatarImage.addEventListener("click", () => {
  // enableValidation(formConfig);
  avatarForm.open();
});

avatarForm.setEventListeners();

// Activa la validación en todos los formularios
const enableValidation = (formConfig) => {
  const forms = document.querySelectorAll(formConfig.formElement);
  forms.forEach((formElement) => {
    const formValidator = new FormValidator(formConfig, formElement);
    formValidator.enableValidation();
  });
};

// Habilitar la validación para los formularios
enableValidation(formConfig);
