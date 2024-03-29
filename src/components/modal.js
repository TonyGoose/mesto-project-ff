function showPopupHandle(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeModalKey);
}

function closePopupHandle(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalKey);
}

function closeModalKey(evt) {
  if (evt.code === "Escape") {
  const popup = document.querySelector(".popup_is-opened");
    if (popup) { 
      closePopupHandle(popup);
    }
  }
}

const closePopupByOverlay = (evt) => {
  const targetClassList = evt.target.classList;
  if (
    targetClassList.contains("popup") ||
    targetClassList.contains("popup__close")
  ) {
    closePopupHandle(evt.currentTarget);
  }
};

export { showPopupHandle, closePopupHandle, closePopupByOverlay };