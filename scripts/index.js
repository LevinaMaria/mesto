import { Card } from './Card.js';
import { initialCards } from './initialCards.js';
import { FormValidator } from './FormValidator.js';

const page = document.querySelector('.page'); //страница
const cards = page.querySelector('.elements'); // место вставки карточек

const popups = page.querySelectorAll('.popup');
const popupEditAuthor = page.querySelector('.popup-edit-author'); // попап редактирования профиля (1)
const popupEditCard = page.querySelector('.popup-edit-card'); // попап добавления карточки (2)
const popupViewImage = page.querySelector('.popup-view-image'); // попап просмотра картинки (3)

const formProfile = popupEditAuthor.querySelector('.popup__edit-profile'); // форма редактирования профиля (1)
const formCard = popupEditCard.querySelector('.popup__edit-card'); // форма редактирования карточки (2)

const nameInput = popupEditAuthor.elements.name; // поле редактирования имени (1)
const sublineInput = popupEditAuthor.elements.subline; // поле редактирования подписи (1)
const popupImgName = popupEditCard.elements.imgName; // имя картинки в карточке (2)
const popupImgUrl = popupEditCard.elements.imgUrl; // ссылка картинки в карточке (2)

const profile = page.querySelector('.profile'); // профиль (секция с именем и данными пользователя)
const profileAuthor = profile.querySelector('.profile__author'); // первоначальное значение имени в профиле (1)
const profileSubline = profile.querySelector('.profile__subline'); // первоначальное значение подписи в профиле (1)

const imageView = popupViewImage.querySelector('.popup__view-image'); // картинка в третьем попапе (3)
const imageViewTitle = popupViewImage.querySelector('.popup__image-title'); // подпись картинки в попакпе (3)

const openAuthorPopupBtn = profile.querySelector('.profile__change-button'); // открытие окна профиля (1)
const openCardPopupBtn = profile.querySelector('.profile__add-button'); // открытие окна добавления карточки (2)
const closePopupButtons = page.querySelectorAll('.popup__close-button'); // кнопка закрытия попап (любого)

// const editAuthorSubmitBtn = popupEditAuthor.querySelector('.edit-author-submit-button');
// const editCardSubmitBtn = popupEditCard.querySelector('.edit-card-submit-button');

const cardSelectors = {
  templateElement: '.element-template',
  card: '.element',
  title: '.element__caption',
  image: '.element__image',
  buttonLike: '.element__like-button',
  buttonLikeActive: '.element__like-button_active',
  buttonDelete: '.element__trash-button'
};

const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__item_invalid',
  errorClass: 'popup__error_visible'
};

const profileFormValidation = new FormValidator(formSelectors, popupEditAuthor);
const cardFormValidation = new FormValidator(formSelectors, popupEditCard);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();

// функция создания карточки
function createCard(item) {
  const newCard = new Card (cardSelectors, item.name, item.link, viewPopupImage);
  return newCard.createCard();
}
// функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapePopup);
  popup.addEventListener('mousedown', closeOnClick);
}
// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapePopup);
  popup.removeEventListener('mousedown', closeOnClick);
}
const escapePopup = (evt) => {
  if (evt.key === 'Escape') {
    const exitPopup = document.querySelector('.popup_opened');
    closePopup(exitPopup);
  }
};
const closeOnClick = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

// открытие попапа просмотра картинки
const openViewPopupImg = (name, link) => {
  imageView.src = link;
  imageView.alt = name;
  imageViewTitle.textContent = name;
  openPopup(popupViewImage);
}

function renderCard (data) {
  data.forEach(item => cards.prepend(createCard(item)));
}
renderCard(initialCards);

// поиск всех кнопок закрытия
closePopupButtons.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const closePopupButton = eventTarget.closest('.popup');

    closePopup(closePopupButton);
  });
});

function openEditProfileForm() {
  nameInput.value = profileAuthor.textContent;
  sublineInput.value = profileSubline.textContent;
  profileFormValidation.resetValidation();
  openPopup(popupEditAuthor);
}

// function openEditCardForm() {
//   formCard.reset();
//   cardFormValidation.resetValidation();
//   openPopup(popupEditCard);
// }

// назначить функцию отправки формы автора
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileAuthor.textContent = nameInput.value;
  profileSubline.textContent = sublineInput.value;

  closePopup(popupEditAuthor);
}

// добавить функцию заполнения карточки пользователем
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const newImgName = popupImgName.value;
  const newImgUrl = popupImgUrl.value;
  cards.prepend(createCard(newImgName, newImgUrl));

  closePopup(popupEditCard);
};

openAuthorPopupBtn.addEventListener('click', openEditProfileForm);

openCardPopupBtn.addEventListener('click', () => {
  popupImgName.value = null;
  popupImgUrl.value = null;
  resetForm(popupEditCard, validationConfig);
  openPopup(popupEditCard);
});

formProfile.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleCardFormSubmit);
