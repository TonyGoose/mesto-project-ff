export { CloseModalKey, showPopupHandle, closePopupHandle}

const popupList = Array.from(document.querySelectorAll('.popup'));

popupList.forEach((popup) => {
  popup.addEventListener('mouseup', (event) => {
    const targetClassList = event.target.classList; 
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) {
      closePopupHandle(popup); 
    }
  })
}) 

// Закрытие по клику на escape


function CloseModalKey(evt) {
  if (evt.code === "Escape") {
    const popup = document.querySelector('.popup_is-opened')
    popup.classList.remove("popup_is-opened");
  }
}

// Открытие попапов

function showPopupHandle(popup) {
  
  popup.classList.add("popup_is-opened");

  document.addEventListener('keydown', CloseModalKey);
}

// Закрытие  со снятием обработчиков

function closePopupHandle(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', CloseModalKey);
}

