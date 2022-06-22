const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("popup__item_invalid");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement)
  inputElement.classList.remove("popup__item_invalid");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
};

const setErrorEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__item"));
  const buttonElement = formElement.querySelector(".popup__submit-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__submit-button_hideInputError");
    buttonElement.setAttribute('hideInputError', true);
  } else {
    buttonElement.classList.remove("popup__submit-button_hideInputError");
    buttonElement.removeAttribute('hideInputError');
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setErrorEventListeners(formElement);
  });
};

//TODO: написать функцию предвалидации
const resetForm = (formElement) => {
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, enableValidation());

  });
  formElement.reset();
};

const setError = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__item"));
  const buttonElement = formElement.querySelector(".popup__submit-button");
  toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  })
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_hideInputError',
  inputErrorClass: 'popup__item_invalid',
  errorClass: 'popup__error_visible'
});