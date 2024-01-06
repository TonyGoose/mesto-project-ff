export { CloseModalKey, showPopupHandle, closePopupHandle };

function showPopupHandle(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", CloseModalKey);
}

function closePopupHandle() {
  const popup = document.querySelector(".popup_is-opened");
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", CloseModalKey);
}

function CloseModalKey(evt) {
  if (evt.code === "Escape") {
    closePopupHandle();
  }
}


