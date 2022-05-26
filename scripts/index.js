const profile = document.querySelector(".profile");
const popup = document.querySelector(".popup");
// определить кнопку открытия попап
const openPopupButton = document.querySelector(
  ".profile__change-button"
);
// определить кнопку закрытия попап
const closePopupButton = popup.querySelector(".popup__close-button");
// определить кнопку сохранения данных в форму
const submitButton = popup.querySelector(".popup__submit-button");
// найти форму и поля ввода
const editProfile = document.querySelector(".popup__edit-profile");
const nameInput = document.querySelector(".popup__item:first-child");
const sublineInput = document.querySelector(".popup__item:nth-of-type(2)");
// найти значения автор и О себе в профиле
const profileAuthor = document.querySelector(".profile__author");
const profileSubline = document.querySelector(".profile__subline");
// шесть карточек из коробки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// назначить переключатель открытия и закрытия попап и заполнения попап при открытии данными из профиля
function togglePopup() {
   if (popup.classList.contains("popup_opened")){
       popup.classList.toggle('popup_opened');
   } else {
       popup.classList.toggle('popup_opened');
       nameInput.value = profileAuthor.textContent;
       sublineInput.value = profileSubline.textContent;
   };
};
// назначить функцию отправки формы
function formSubmitHandler (evt) {
      evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileSubline.textContent = sublineInput.value;
    togglePopup();
}
// вывести функции
openPopupButton.addEventListener("click", togglePopup);
closePopupButton.addEventListener("click", togglePopup);

editProfile.addEventListener('submit', formSubmitHandler);