const formElement = document.querySelectorAll(".popup__form");
const inputElement = formElement.querySelectorAll(".popup__item");

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMassege);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(".${inputElement.id}-error");

  inputElement.classlist.add("popup__item_invalid");
  errorElement.textContent = errorMessage;
  errorElement.classlist.add("popup__error_visible");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classlist.add("popup__item_invalid");
  errorElement.classlist.add("popup__error_visible");
  errorElement.textContent = "";
};

const setErrorEventListeners = (formElement) => {
  const inputList = Array.form(formElement.querySelectorAll(".popup__item"));
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
    buttonElement.classlist.add("popup__submit-button_disabled");
  } else {
    buttonElement.classlist.remove("popup__submit-button_disabled");
  }
};

const enableValidation = () => {
  const formList = Array.form(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setErrorEventListeners(formElement);
  });
};

enableValidation(); //что вызываем в функции?