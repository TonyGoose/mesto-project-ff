function enableValidation(validationSettingsObject) {
  const formList = Array.from(
    document.querySelectorAll(validationSettingsObject.myForm)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationSettingsObject);
  });
}

const clearValidation = (formElement, validationSettingsObject) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettingsObject.popupInput)
  );
  const buttonElement = formElement.querySelector(
    validationSettingsObject.popupButton
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettingsObject);
  });
  toggleButtonState(inputList, buttonElement);
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationSettingsObject
) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettingsObject.inputError);
  formError.textContent = errorMessage;
  formError.classList.add(validationSettingsObject.inputTextError);
};

const hideInputError = (
  formElement,
  inputElement,
  validationSettingsObject
) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettingsObject.inputError);
  formError.textContent = "";
  formError.classList.remove(validationSettingsObject.inputTextError);
};

const formIsValid = (formElement, inputElement, validationSettingsObject) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationSettingsObject
    );
  } else {
    hideInputError(formElement, inputElement, validationSettingsObject);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  buttonElement.disabled = hasInvalidInput(inputList);
};

const setEventListeners = (formElement, validationSettingsObject) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettingsObject.popupInput)
  );
  const buttonElement = formElement.querySelector(
    validationSettingsObject.popupButton
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      formIsValid(formElement, inputElement, validationSettingsObject);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export { clearValidation, enableValidation };