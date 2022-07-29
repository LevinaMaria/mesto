import { Card } from './Card.js';
import { initialCards } from './initialCards.js';
import { FormValidator } from './FormValidator.js';
import { cardsConfig, validationConfig } from './data.js';


const nameInput = popupEditAuthor.querySelector('.item-name'); // поле редактирования имени (1)
const sublineInput = popupEditAuthor.querySelector('.item-subline'); // поле редактирования подписи (1)
const popupImgName = popupEditCard.querySelector('.item-img-name'); // имя картинки в карточке (2)
const popupImgUrl = popupEditCard.querySelector('.item-img-url'); // ссылка картинки в карточке (2)

const formValidationProfile = new FormValidator (validationConfig, popupEditAuthor);
const formValidationCard = new FormValidator (validationConfig, popupEditCard);
formValidationProfile.enableValidation();
formValidationCard.enableValidation();

// функция создания карточки
function createCard(item) {
  const newCard = new Card (cardsConfig, item.name, item.link, viewPopupImage);
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
const viewPopupImage = (name, link) => {
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
buttonsClosePopup.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const closePopupButton = eventTarget.closest('.popup');

    closePopup(closePopupButton);
  });
});

function openEditProfileForm() {
  nameInput.value = profileAuthor.textContent;
  sublineInput.value = profileSubline.textContent;
  openPopup(popupEditAuthor);
}

function openEditCardForm() {
  formCard.reset();
  formValidationCard.resetValidation();
  openPopup(popupEditCard);
}

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
const data = {name: popupImgName.value, link: popupImgUrl.value}
  cards.prepend(createCard(data));

  closePopup(popupEditCard);
};

buttonOpenPopupProfile.addEventListener('click', openEditProfileForm);

buttonOpenPopupCard.addEventListener('click', () => {
  popupImgName.value = ' ';
  popupImgUrl.value = ' ';
  
  openEditCardForm(popupEditCard);
});

formProfile.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleCardFormSubmit);
