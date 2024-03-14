import "./pages/index.css";

import {
  updateUserAvatar,
  updateUserProfile,
  addNewCard,
  getUserData,
  getInitialCards,
} from "./components/api.js";

import {
  createCardElement,
  deleteCardHandler,
  likeCardHandler,
} from "./components/card.js";

import { showPopupHandle, closePopupHandle, closePopupByOverlay } from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";

const container = document.querySelector(".places__list");
const addPopup = document.querySelector(".popup_type_new-card");
const editPopup = document.querySelector(".popup_type_edit");
const editPopupSaveButton = editPopup.querySelector(".popup__button");
const editPopupButton = document.querySelector(".profile__edit-button");
const editFormElement = document.querySelector('form[name="edit-profile"]');
const nameInput = editFormElement.querySelector('input[name="name"]');
const jobInput = editFormElement.querySelector('input[name="description"]');
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarPopupSaveButton = avatarPopup.querySelector(".popup__button");
const addFormElement = document.querySelector('form[name="new-place"]');
const placeName = addFormElement.querySelector('input[name="place-name"]');
const placeLink = addFormElement.querySelector('input[name="link"]');
const popupImage = document.querySelector('.popup_type_image');
const imageСaption = popupImage.querySelector('.popup__caption');
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const addPopupButton = document.querySelector(".profile__add-button");
const addPopupSaveButton = addPopup.querySelector(".popup__button");
const imagePopup = document.querySelector(".popup_type_image");
const cardPopupImage = document.querySelector(".popup__image");
const avatarEdit = document.querySelector(".profile__image");
const avatarInlineStyles = avatarEdit.style;
const avatarFormElement = document.querySelector('form[name="edit-avatar"]');
const avatarNewLink = avatarFormElement.querySelector('input[name="link"]');

const validationSettingsObject = {
  myForm: ".popup__form",
  popupInput: ".popup__input",
  popupButton: ".popup__button",
  inputError: "popup__input-error",
  inputTextError: "popup__input-error-text-active",
};

function addCardToContainer(card, profileId) {
  const newCard = createCardElement(
    card,
    deleteCardHandler,
    likeCardHandler,
    clickImageHandle,
    profileId
  );
  container.prepend(newCard);
  return newCard;
}

let profileId;

Promise.all([getUserData(), getInitialCards()])
  .then(([profile, cards]) => {
    profileId = profile._id;
    const newAvatarUrl = profile.avatar;
    profileName.textContent = profile.name;
    profileJob.textContent = profile.about;
    avatarInlineStyles.backgroundImage = `url('${newAvatarUrl}')`;
    cards.reverse().forEach((card) => {
      addCardToContainer(card, profileId);
    });
  })
  .catch((err) => {
    console.log(err);
  });


addPopupButton.addEventListener("click", () => showPopupHandle(addPopup));
addPopup.addEventListener("submit", () => closePopupHandle(addPopup));

editPopupButton.addEventListener("click", () => {
  showPopupHandle(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(editPopup, validationSettingsObject);
});

const popupList = Array.from(document.querySelectorAll(".popup"));
popupList.forEach((popup) => {
  popup.addEventListener("mouseup", closePopupByOverlay);
});

avatarPopup.addEventListener("submit", () => closePopupHandle(avatarPopup));
avatarEdit.addEventListener("click", () => showPopupHandle(avatarPopup));

function handleEditAvatar(evt) {
  evt.preventDefault();
  avatarPopupSaveButton.textContent = "Сохранение...";
  updateUserAvatar(avatarNewLink.value)
    .then((res) => {
      avatarInlineStyles.backgroundImage = `url('${res.avatar}')`;
    })
    .finally(() => {
      avatarPopupSaveButton.textContent = "Cохранить";
    })
    .catch((err) => {
      console.log(err);
    });
  avatarFormElement.reset();
}

avatarFormElement.addEventListener("submit", handleEditAvatar);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  editPopupSaveButton.textContent = "Сохранение...";
  updateUserProfile(nameInput.value, jobInput.value)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
    })
    .finally(() => {
      editPopupSaveButton.textContent = "Cохранить";
    })
    .catch((err) => {
      console.log(err);
    });
  closePopupHandle();
}

editFormElement.addEventListener("submit", handleProfileFormSubmit);
editPopupSaveButton.addEventListener("click", () => {});

function handleAddSubmit(evt) {
  evt.preventDefault();
  addPopupSaveButton.textContent = "Сохранение...";
  addNewCard(placeName.value, placeLink.value)
    .then((card) => {
      addCardToContainer(card, profileId);
      addFormElement.reset();
    })
    .finally(() => {
      addPopupSaveButton.textContent = "Cохранить";
    })
    .catch((err) => {
      console.log(err);
    });
}

addFormElement.addEventListener("submit", handleAddSubmit, () => {
  clearValidation(addFormElement, validationSettingsObject);
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
  imageСaption.textContent = evt.target.alt;
  showPopupHandle(imagePopup);
}

enableValidation(validationSettingsObject);