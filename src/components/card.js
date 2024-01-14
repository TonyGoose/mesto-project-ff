const template = document.querySelector("#card-template").content;

function createCardElement(card, deleteCardHandler, likeCardHandler, clickImageHandle) {
  const cardElement = template.querySelector(".places__item").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  
  cardElement.querySelector(".card__title").textContent = card.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener('click', clickImageHandle);
  deleteButton.addEventListener("click", deleteCardHandler);
  likeButton.addEventListener("click", likeCardHandler);

  return cardElement;
}

function deleteCardHandler(evt) {
    const card = evt.target.closest(".places__item");
    card.remove();
  }

function likeCardHandler(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCardElement, deleteCardHandler, likeCardHandler }