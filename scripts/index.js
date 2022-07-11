import Card from './Card.js';//???
import {initialCards} from './initialCards.js';
import {FormValidator} from './FormValidator.js';//???

const page = document.querySelector(".page"); //страница
const profile = page.querySelector(".profile"); // профиль (секция с именем и данными пользователя)
const popupEditAuthor = page.querySelector(".popup-edit-author"); // попап редактирования профиля (1)
const popupEditCard = page.querySelector(".popup-edit-card"); // попап добавления карточки (2)
const popupViewImage = page.querySelector(".popup-view-image"); // попап просмотра картинки (3)
const openAuthorPopupBtn = profile.querySelector(".profile__change-button"); // открытие окна профиля (1)
const openCardPopupBtn = profile.querySelector(".profile__add-button"); // открытие окна добавления карточки (2)
const closePopupButtons = page.querySelectorAll(".popup__close-button"); // кнопка закрытия попап (любого)
const formProfile = popupEditAuthor.querySelector(".popup__edit-profile"); // форма редактирования профиля (1)
const formCard = popupEditCard.querySelector(".popup__edit-card"); // форма редактирования карточки (2)
const nameInput = popupEditAuthor.querySelector(".item-name"); // поле редактирования имени (1)
const sublineInput = popupEditAuthor.querySelector(".item-subline"); // поле редактирования подписи (1)
const profileAuthor = profile.querySelector(".profile__author"); // первоначальное значение имени в профиле (1)
const profileSubline = profile.querySelector(".profile__subline"); // первоначальное значение подписи в профиле (1)
const popupImgName = popupEditCard.querySelector(".item-img-name"); // имя картинки в карточке (2)
const popupImgUrl = popupEditCard.querySelector(".item-img-url"); // ссылка картинки в карточке (2)
const elements = page.querySelector(".elements"); // все карточки с картинками (2)
const templateElement = page.querySelector(".element-template").content; // привязать темплейт к карточке (2)
const imageView = popupViewImage.querySelector(".popup__view-image"); // картинка в третьем попапе (3)
const imageViewTitle = popupViewImage.querySelector(".popup__image-title"); // подпись картинки в попакпе (3)
const editAuthorSubmitBtn = popupEditAuthor.querySelector(".edit-author-submit-button");
const editCardSubmitBtn = popupEditCard.querySelector(".edit-card-submit-button");

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__item_invalid',
  errorClass: 'popup__error_visible'
};

const profileFormValidation = new FormValidator(validationConfig, popupEditAuthor);
const cardFormValidation = new FormValidator(validationConfig, popupEditCard);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();

const resetForm = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig)
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
}

// функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", escapePopup);
  popup.addEventListener("mousedown", closeOnClick);
}
// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escapePopup);
  popup.removeEventListener("mousedown", closeOnClick);
}
const escapePopup = (evt) => {
  if (evt.key === "Escape") {
    const exitPopup = document.querySelector(".popup_opened");
    closePopup(exitPopup);
  }
};
const closeOnClick = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
};
//функция передачи данных карточке
function createCard(name, link) {
  

  const likeImage = cardElement.querySelector(".element__like-button"); // кнопка лайк в карточке

  function listenLikeImage(event) {
    event.target.classList.toggle("element__like-button_active");
  }
  likeImage.addEventListener("click", listenLikeImage);
  // назначить слушатель события нажатия кнопки лайк и присвоения по клику класса "Актив"

  const deleteCardBtn = cardElement.querySelector(".element__trash-button"); // кнопка удаления карточки
  deleteCardBtn.addEventListener("click", () => {
    const deletedEelement = deleteCardBtn.closest(".element"); // назначить выбор удаляемой карточки
    deletedEelement.remove(); // удалить карточку
  });
  // слушатель события клика на картинку. TODO перенести слушатель в конец скрипта
  cardImage.addEventListener("click", () => {
    openPopup(popupViewImage); // открытие попапа по клику на картинку (3)
    imageView.src = link;
    imageView.alt = name;
    imageViewTitle.textContent = name;
  });

  return cardElement;
}
function renderCard(name, link) {
  elements.prepend(createCard(name, link));
}

// данные карточек из констант
initialCards.forEach((item) => {
  const name = item.name;
  const link = item.link;
  renderCard(name, link);
});

// поиск всех кнопок закрытия
closePopupButtons.forEach((item) => {
  item.addEventListener("click", (evt) => {
    const eventTarget = evt.target;
    const closePopupButton = eventTarget.closest(".popup");

    closePopup(closePopupButton);
  });
});

function openEditProfileForm() {
  nameInput.value = profileAuthor.textContent;
  sublineInput.value = profileSubline.textContent;
  resetForm(popupEditAuthor, validationConfig);
  openPopup(popupEditAuthor);
}

// назначить функцию отправки формы автора
function profileSubmitHandler(evt) {
  evt.preventDefault();
  profileAuthor.textContent = nameInput.value;
  profileSubline.textContent = sublineInput.value;

  closePopup(popupEditAuthor);
}
// добавить функцию заполнения карточки пользователем
function cardSubmitHandler(evt) {
  evt.preventDefault();
  const newImgName = popupImgName.value;
  const newImgUrl = popupImgUrl.value;
  renderCard(newImgName, newImgUrl);

  closePopup(popupEditCard);
};

openAuthorPopupBtn.addEventListener("click", openEditProfileForm);

openCardPopupBtn.addEventListener("click", () => {
  popupImgName.value = null;
  popupImgUrl.value = null;
  resetForm(popupEditCard, validationConfig);
  openPopup(popupEditCard);
});

formProfile.addEventListener("submit", profileSubmitHandler);
formCard.addEventListener("submit", cardSubmitHandler);
