function showPopupHandle(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeModalKey);
}

function closePopupHandle() {
  const popup = document.querySelector(".popup_is-opened");
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalKey);
}

function closeModalKey(evt) {
  if (evt.code === "Escape") {
    closePopupHandle();
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
