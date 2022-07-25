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

  export { cardsConfig, validationConfig};