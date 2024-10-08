import "./pages/index.css";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import {
  boton,
  btnAdd,
  inputAbout,
  inputName,
  profileName,
  profileAbout,
} from "./utils/utils.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import { cardGenerator } from "./utils/utils.js";
const formProfile = document.querySelector(".popup__container");
const formCards = document.querySelector("#popup_addCard");
const cardArea = document.querySelector(".elements");
const initialCards = [
  {
    name: "Austria",
    link: "https://images.unsplash.com/photo-1520503922584-590e8f7a90d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Noruega",
    link: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Arabia",
    link: "https://images.unsplash.com/photo-1507671280192-5900ae887d3d?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Suiza",
    link: "https://images.unsplash.com/photo-1462651567147-aa679fd1cfaf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tahití",
    link: "https://images.unsplash.com/photo-1706868882998-75f31e94a5f6?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Canadá",
    link: "https://images.unsplash.com/photo-1506104489822-562ca25152fe?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
//Instanciar para agregar imagenes con el handlerCardClick
const popupImageCard = new PopupWithImage("#popup_add");
const popupAddButton = new PopupWithForm(
  "#ventana_modal-add",
  (inputValues) => {
    const card = new Card(
      inputValues.name,
      inputValues.link,
      ".template-card",
      {
        handleCardClick: () => {
          popupImageCard.open(inputValues.name, inputValues.link);
        },
      }
    );
    cardArea.prepend(card.generateCard());
  }
);
const useInfo = new UserInfo(
  ".profile-info__avatar_name",
  ".profile-info__avatar_ocupation"
);
const popupProfile = new PopupWithForm("#ventana_modal", (inputValues) => {
  profileName.textContent = inputValues.name;
  profileAbout.textContent = inputValues.about;
  popupProfile.close();
});
boton.addEventListener("click", () => {
  popupProfile.open();
  const userData = useInfo.getUserInfo();
  inputName.textContent = userData.username;
  inputAbout.textContents = userData.job;
});
btnAdd.addEventListener("click", () => {
  popupAddButton.open();
});

const formValidatorProfile = new FormValidator(formProfile);
formValidatorProfile.enableValidation();
const formValidatorAddCard = new FormValidator(formCards);
formValidatorAddCard.enableValidation();

const sectionCards = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const newCard = cardGenerator(element.name, element.link);
      sectionCards.addItem(newCard);
    },
  },
  ".elements"
);

sectionCards.renderer();
