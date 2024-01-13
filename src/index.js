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
  closeModalKey,
} from './components/modal.js';

const container = document.querySelector('.places__list');

const popupList = Array.from(document.querySelectorAll(".popup"));

const addPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit');
const editPopupButton = document.querySelector('.profile__edit-button');

const addFormElement = document.querySelector('form[name="new-place"]');
const placeName = addFormElement.querySelector('input[name="place-name"]');
const placeLink = addFormElement.querySelector('input[name="link"]');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const addPopupButton = document.querySelector('.profile__add-button');


const imagePopup = document.querySelector('.popup_type_image');
const cardPopupImage = document.querySelector('.popup__image');
const imageСaption = imagePopup.querySelector('.popup__caption');

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
  addCardToContainer(cards);
});

addPopup.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
  closePopupHandle(addPopup); 
}); 

addPopupButton.addEventListener('click', () => showPopupHandle(addPopup));

editPopup.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
  closePopupHandle(editPopup); 
}); 

editPopupButton.addEventListener('click', () => {
  showPopupHandle(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

popupList.forEach((popup) => {
  popup.addEventListener("mouseup", (evt) => {
    const targetClassList = evt.target.classList;
    if (
      targetClassList.contains("popup") ||
      targetClassList.contains("popup__close")
    ) {
      closePopupHandle(popup);
    }
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

function handleAddSubmit(evt) {
  evt.preventDefault();

  const newPlaceData = { name: placeName.value, link: placeLink.value };

  addCardToContainer(newPlaceData);

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
  imageСaption.textContent = evt.target.alt;

  showPopupHandle(imagePopup);
}