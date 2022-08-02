const cardsConfig = {
    templateElement: '.element-template',
    card: '.element',
    title: '.element__caption',
    image: '.element__image',
    buttonLike: '.element__like-button',
    buttonLikeActive: 'element__like-button_active',
    buttonDelete: '.element__trash-button'
  };
  
  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__item_invalid',
    errorClass: 'popup__error_visible'
  };

  const popupConfig = {
    opened: 'popup_opened',
    buttonClosePopup: 'popup__close-button',
    form: '.popup__form',
    input: '.popup__item',
    popupEditAuthor: '.popup-edit-author',
    popupEditCard: '.popup-edit-card',
    popupViewImage: '.popup-image-view',
    imageView: '.popup__view-image',
    imageViewTitle: '.popup__image-title'
  }
  const profileConfig = {
    name: '.profile__author',
    subline: '.profile__subline'
  }
  
  const formProfile = document.querySelector('.popup__edit-profile');
  const formCard = document.querySelector('.popup__edit-card');
  const page = document.querySelector('.page');
  const profile = page.querySelector('.profile');
  const buttonOpenPopupProfile = profile.querySelector('.profile__change-button');
  const buttonOpenPopupCard = profile.querySelector('.profile__add-button'); 
  const cards = page.querySelector('.elements');

  export { 
    cardsConfig, 
    validationConfig, 
    popupConfig, 
    profileConfig,
    formProfile,
    formCard,
    buttonOpenPopupProfile,
    buttonOpenPopupCard,
    cards
  };