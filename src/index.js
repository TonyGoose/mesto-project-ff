import './pages/index.css';
import { initialCards } from './components/cards.js';
import {
  createCardElement,
  deleteCardHandler,
  likeCardHandler,
} from './components/card.js';
import {
  showPopupHandle,
  closePopupHandle,
  CloseModalKey,
} from './components/modal.js';

const container = document.querySelector('.places__list');


const addPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit');
const editPopupButton = document.querySelector('.profile__edit-button');

const addFormElement = document.querySelector('form[name="new-place"]');
const placeName = addFormElement.querySelector('input[name="place-name"]');
const placeLink = addFormElement.querySelector('input[name="link"]');

const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('input[name="name"]');
const jobInput = formEditProfile.querySelector('input[name="description"]');

const addPopupButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const imagePopup = document.querySelector('.popup_type_image');
const cardPopupImage = document.querySelector('.popup__image');

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

addPopup.addEventListener('submit', () => closePopupHandle(addPopup));
addPopupButton.addEventListener('click', () => showPopupHandle(addPopup));

editPopup.addEventListener('submit', () => closePopupHandle(editPopup));
editPopupButton.addEventListener('click', () => {
  showPopupHandle(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

formEditProfile.addEventListener('submit', handleFormSubmit);

function handleAddSubmit(evt) {
  evt.preventDefault();

  const newPlaceData = { name: placeName.value, link: placeLink.value };

  addCard(newPlaceData, deleteCard);

  addFormElement.reset();
}

addFormElement.addEventListener('submit', handleAddSubmit);

function clickImageHandle(evt) {
  if (
    evt.target.classList.contains('card__delete-button') ||
    evt.target.classList.contains('card__like-button')
  ) {
    return;
  }

  const card = evt.target.closest('.places__item');
  const cardImage = card.querySelector('.card__image');

  cardPopupImage.src = cardImage.src;
  cardPopupImage.alt = cardImage.alt;

  showPopupHandle(imagePopup);

  document.addEventListener('keydown', CloseModalKey);
}
