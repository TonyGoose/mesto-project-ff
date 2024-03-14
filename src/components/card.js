import { deleteCard, likeCard, unLikeCard } from "./api.js";

const template = document.querySelector("#card-template").content;

function createCardElement(
  card,
  deleteCardHandler,
  likeCardHandler,
  clickImageHandle,
  profileId
) {
  const cardElement = template.querySelector(".places__item").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  const hasProfileLike = card.likes.some((like) => {
    return like._id === profileId;
  });

  if (hasProfileLike) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardElement.querySelector(".card__title").textContent = card.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const countForLikes = cardElement.querySelector(".card__like-container");
  countForLikes.textContent = card.likes.length;

  if (card.owner._id === profileId) {
    deleteButton.addEventListener("click", (evt) => {
      deleteCardHandler(evt, card._id);
    });
  } else {
    deleteButton.classList.add("card__delete-button-hide");
  }

  likeButton.addEventListener("click", (evt) => {
    likeCardHandler(evt, card._id, countForLikes);
  });

  cardElement.addEventListener("click", clickImageHandle);
  return cardElement;
}

function deleteCardHandler(evt, cardID) {
  deleteCard(cardID).then(() => evt.target.closest(".card").remove());
}

function likeCardHandler(evt, cardID, countForLikes) {
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? unLikeCard : likeCard;
  likeMethod(cardID)
    .then((res) => {
      countForLikes.textContent = res.likes.length;
      evt.target.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
}

export { createCardElement, deleteCardHandler, likeCardHandler };
