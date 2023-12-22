
export {initialCards, addCardToContainer, handleDeleteButtonClick, createCardElement}

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const template = document.querySelector("#card-template").content;
const container = document.querySelector(".places__list");

function handleDeleteButtonClick(event) {
  const card = event.target.closest(".places__item");
  card.remove();
}

function createCardElement(data, deleteCardHandler) {
  const cardElement = template.querySelector(".places__item").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = data.name;
  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = data.name;

  deleteButton.addEventListener("click", deleteCardHandler);

  return cardElement;
}

function addCardToContainer(data) {
  const newCard = createCardElement(data, handleDeleteButtonClick);
  container.append(newCard);

  return newCard;
}

initialCards.forEach((card) => {
  addCardToContainer(card);
});