const imageButtonAdd = new URL('../images/add.svg', import.meta.url);
const imageButtonClose = new URL('../images/CloseIcon.svg', import.meta.url);
const imageButtonDelete = new URL('../images/Group.svg', import.meta.url);
const imageButtonEditPen = new URL('../images/change.svg', import.meta.url);
const imageButtonLikeActive = new URL('../images/Union.svg', import.meta.url);
const imageButtonDisabled = new URL('../images/like.svg', import.meta.url);
const imageLogo = new URL('../images/logo.svg', import.meta.url);

const images = [
  { name: 'imageButtonAdd', link: imageButtonAdd },
  { name: 'imageButtonClose', link: imageButtonClose },
  { name: 'imageButtonDelete', link: imageButtonDelete },
  { name: 'imageButtonEditPen', link: imageButtonEditPen },
  { name: 'imageButtonLikeActive', link: imageButtonLikeActive },
  { name: 'imageButtonDisabled', link: imageButtonDisabled },
  { name: 'imageLogo', link: imageLogo},
]

const cardsConfig = {
    templateElement: '.element-template',
    card: '.element',
    title: '.element__caption',
    image: '.element__image',
    buttonLike: '.element__like-button',
    likesCounter: '.element__like-counter',
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
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    popupEditAuthor: '.popup-edit-author',
    popupEditCard: '.popup-edit-card',
    popupEditAvatar: '.popup-edit-avatar',
    popupViewImage: '.popup-image-view',
    popupDeleteConfirm: '.popup-delete-confirm',
    imageView: '.popup__view-image',
    imageViewTitle: '.popup__image-title'
  }
  const profileConfig = {
    name: '.profile__author',
    about: '.profile__subline',
    avatar: '.profile__image'
  }
  
  const formProfile = document.querySelector('.popup__edit-profile');
  const formCard = document.querySelector('.popup__edit-card');
  const formConfirm = document.querySelector('.popup__delete-confirm');
  const formAvatar = document.querySelector('.popup__edit-avatar');
  const page = document.querySelector('.page');
  const profile = page.querySelector('.profile');
  const buttonOpenPopupProfile = profile.querySelector('.profile__change-button');
  const buttonOpenPopupCard = profile.querySelector('.profile__add-button');
  const imageAvatar = profile.querySelector('.profile__image');
  const cards = page.querySelector('.elements');

  export { 
    cardsConfig, 
    validationConfig, 
    popupConfig, 
    profileConfig,
    formProfile,
    formCard,
    formAvatar,
    formConfirm,
    buttonOpenPopupProfile,
    buttonOpenPopupCard,
    imageAvatar,
    cards
  };