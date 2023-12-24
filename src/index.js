import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import {
  createCardElement,
  deleteCardHandler,
  likeCardHandler,
} from "./components/card.js";
import {
  showPopupHandle,
  closePopupHandle,
  CloseModalKey,
} from "./components/modal.js";

const container = document.querySelector(".places__list");

const addFormElement = document.querySelector('form[name="new-place"]');
const imagePopup = document.querySelector(".popup_type_image");
const cardPopupImage = document.querySelector(".popup__image");

function addCardToContainer(card) {
  const newCard = createCardElement(
    card,
    deleteCardHandler,
    likeCardHandler,
    clickImageHandle
  );

  container.insertBefore(newCard, container.firstChild);

  return newCard;
}

initialCards.forEach((cards) => {
  addCardToContainer(cards, clickImageHandle);
});

function clickImageHandle(evt) {
  if (
    evt.target.classList.contains("card__delete-button") ||
    evt.target.classList.contains("card__like-button")
  ) {
    return;
  }

  const card = evt.target.closest(".places__item");
  const cardImage = card.querySelector(".card__image");

  cardPopupImage.src = cardImage.src;
  cardPopupImage.alt = cardImage.alt;

  showPopupHandle(imagePopup);

  document.addEventListener("keydown", CloseModalKey);
}
