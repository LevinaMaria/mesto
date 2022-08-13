import './index.css';

import { Card } from '../components/Card.js';
import { UserInfo} from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { 
  cardsConfig, 
  validationConfig, 
  popupConfig, 
  profileConfig,
  formProfile,
  formCard,
  formAvatar,
  buttonOpenPopupProfile,
  buttonOpenPopupCard,
  imageAvatar,
  cards
} from '../utils/data.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Api } from '../components/Api.js';
import { PopupConfirm } from '../components/PopupConfirm';

const formValidationProfile = new FormValidator (validationConfig, formProfile);
const formValidationCard = new FormValidator (validationConfig, formCard);
const formValidationAvatar = new FormValidator (validationConfig, formAvatar);
formValidationProfile.enableValidation();
formValidationCard.enableValidation();
formValidationAvatar.enableValidation();

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: 'd2927a66-2e39-422a-a606-c8f414d66ce8',
    'Content-type': 'application/json'
  }
});

const newUserInfo = new UserInfo (profileConfig);

const popupAddCard = new PopupWithForm (
  popupConfig.popupEditCard,
  popupConfig,
  handleCardSubmit
);

const popupAddProfile = new PopupWithForm (
  popupConfig.popupEditAuthor,
  popupConfig,
  handleProfileSubmit
);

const popupAddAvatar = new PopupWithForm(
  popupConfig.popupEditAvatar,
  popupConfig,
  handleAvatarSubmit
);

const popupConfirm = new PopupConfirm (
  popupConfig.popupDeleteConfirm,
  popupConfig,
  deleteCard
);

const popupImage = new PopupWithImage (
  popupConfig.popupViewImage,
  popupConfig
);

//renderer
const cardList = new Section ({
  items: [],
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, cards);

function loadAllData (){
  Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    newUserInfo.setUserInfo(userData);
    cardList.renderItems(cardsData.reverse());
  })
  .catch((error) => console.log(`Ошибка: ${error}`));
};

// функция создания карточки
function createCard(item) {
  const newCard = new Card (
    cardsConfig,
    item,
    handleCardClick,
    handleLikeClick,
    popupConfirm,
    newUserInfo.getUserInfo()
    );
  return newCard.createCard();
};

function handleAvatarSubmit () {
  popupAddAvatar.showLoader(true, 'Сохранение...')
  api.setUserAvatar(popupAddAvatar._getInputValues())
  .then((data) => newUserInfo.setUserInfo(data))
  .then(() => popupAddAvatar.close())
  .catch((error) => console.log(error))
  .finally(() => popupAddAvatar.showLoader(false))
};

function deleteCard (cardId, cardElement) {
  console.log('deleteCard')
  popupConfirm.showLoader(true, 'Удаление...');
  api.deleteCard(cardId)
  .then(() => cardElement.remove())
  .then(() => popupConfirm.close())
  .catch((error) => console.log(error))
  .finally(() => popupConfirm.showLoader(false))
}

function handleCardClick (name, link) {
  popupImage.open(name, link);
};

function handleCardSubmit (inputValues) {
  popupAddCard.showLoader(true, 'Создание...');
  api.addCard(inputValues)
  .then((res) => cardList.addItem(createCard(res)))
  .then(() => popupAddCard.close())
  .catch((error) => console.log(error))
  .finally(() => popupAddCard.showLoader(false))
};

function handleProfileSubmit (inputValues) {
  popupAddProfile.showLoader(true, 'Сохранение...')
  api.editUserInfo(inputValues)
  .then((data) => newUserInfo.setUserInfo(data))
  .then(() => popupAddProfile.close())
  .catch((error) => console.log(error))
  .finally(() => popupAddProfile.showLoader(false))
}

function handleLikeClick (isAnyLikesBefore, likesArr, cardId, buttonLike, buttonLikeActiveSelector, likesCounter) {
  console.log('bkj')
  const currentUser = newUserInfo.getUserInfo();
  console.log(currentUser)
  if (!isAnyLikesBefore) {
    api.putLike(cardId, currentUser)
    .then((card) => {
      buttonLike.classList.add(buttonLikeActiveSelector);
      likesArr.push(currentUser)
      likesCounter.textContent = card.likes.length;
    })
    .catch((error) => console.log(error))
  } else {
    api.deleteLike(cardId, currentUser)
    .then((card) => {
      buttonLike.classList.remove(buttonLikeActiveSelector);
      likesArr.pop(currentUser)
      likesCounter.textContent = card.likes.length;
    })
    .catch ((error) => console.log(error))
  }
}

buttonOpenPopupProfile.addEventListener('click', () => {
  popupAddProfile.open();
  popupAddProfile.setInputValues(newUserInfo.getUserInfo());
});

buttonOpenPopupCard.addEventListener('click', () => {
  formValidationCard.resetValidation();
  popupAddCard.open();
});

imageAvatar.addEventListener('click', () => {
  popupAddAvatar.open();
  formValidationAvatar.resetValidation();
});

popupAddProfile.setEventListeners();
popupAddCard.setEventListeners();
popupAddAvatar.setEventListeners();
popupConfirm.setEventListeners();
popupImage.setEventListeners();

loadAllData();