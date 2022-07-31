import './index.css';

import { Card } from '../components/Card.js';
import { UserInfo} from '../components/UserInfo.js';
import { initialCards } from '../utils/initialCards.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { 
  cardsConfig, 
  validationConfig, 
  popupConfig, 
  profileConfig,
  formProfile,
  formCard,
  buttonOpenPopupProfile,
  buttonOpenPopupCard,
  cards 
} from '../utils/data.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js'

const formValidationProfile = new FormValidator (validationConfig, popupEditAuthor);
const formValidationCard = new FormValidator (validationConfig, popupEditCard);
formValidationProfile.enableValidation();
formValidationCard.enableValidation();

// функция создания карточки
function createCard(item) {
  const newCard = new Card (cardsConfig, item.name, item.link, viewPopupImage);
  return newCard.createCard();
}

//renderer
const initialCardsRenderer = new Section ({
  inputData: initialCards,
  renderer: (item) => {
    initialCardsRenderer.addItem(createCard(item));
  }
}, cards);
initialCardsRenderer.renderAll();

const popupImage = new PopupWithImage (popupConfig.popupViewImage, popupConfig);
popupImage.setEventListeners();

function handleCardSubmit (name, link) {
  popupImage.open(name, link);
};

function handleCardSubmit (inputValues) {
  initialCardsRenderer.addItem(createCard(inputValues));
};

const popupAddCard = new PopupWithForm (
  popupConfig.popupEditCard,
  popupConfig,
  handleCardSubmit
);

popupAddCard.setEventListeners();

const profileUpdate = UserInfo (profileConfig);

function handleProfileSubmit (inputValues) {
  profileUpdate.setUserInfo(inputValues);
};

const popupAddProfile = new PopupWithForm (
  popupConfig.popupEditAuthor,
  popupConfig,
  handleProfileSubmit
);

popupAddProfile.setEventListeners();

buttonOpenPopupProfile.addEventListener('click', () => {
  popupAddProfile.open();
  formValidationProfile.resetValidation();
  popupAddProfile.setInputValues(profileUpdate.getUserInfo());
});

buttonOpenPopupCard.addEventListener('click', () => {
  formValidationProfile.resetValidation();
  popupAddCard.open();
});
