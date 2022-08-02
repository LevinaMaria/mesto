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

const formValidationProfile = new FormValidator (validationConfig, formProfile);
const formValidationCard = new FormValidator (validationConfig, formCard);
formValidationProfile.enableValidation();
formValidationCard.enableValidation();

// функция создания карточки
function createCard(item) {
  const newCard = new Card (cardsConfig, item, handleCardClick);
  return newCard.createCard();
}

//renderer
const cardList = new Section ({
  items: initialCards.reverse(),
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.elements');
cardList.renderItems();

const popupImage = new PopupWithImage (popupConfig.popupViewImage, popupConfig);
popupImage.setEventListeners();

function handleCardClick (imgName, imgUrl) {
  popupImage.open(imgName, imgUrl);
};

function handleCardSubmit (inputValues) {
  cardList.addItem(createCard(inputValues));
};

const popupAddCard = new PopupWithForm (
  popupConfig.popupEditCard,
  popupConfig,
  handleCardSubmit
);

popupAddCard.setEventListeners();

const profileUpdate = new UserInfo (profileConfig);

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
