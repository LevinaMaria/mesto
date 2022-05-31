// шесть карточек из коробки
const initialCards = [
  {
    name: 'Шри-Ланка',
    link: 'images/6.JPG'
  },
  {
    name: 'о. Сими',
    link: 'images/4.JPG'
  },
  {
    name: 'Лондон',
    link: 'images/1.JPG'
  },
  {
    name: 'Крым',
    link: 'images/3.JPG'
  },
  {
    name: 'Венеция',
    link: 'images/2.JPG'
  },
  {
    name: 'Бат',
    link: 'images/5.JPG'
  }
];

const page = document.querySelector(".page"); //страница
const profile = page.querySelector(".profile"); // профиль (секция с именем и данными пользователя)
const popup = page.querySelector(".popup"); // все модальные окна
const popupEditAuthor = page.querySelector('.popup-edit-author'); // попап редактирования профиля (1)
const popupEditCard = page.querySelector('.popup-edit-card'); // попап добавления карточки (2)
const popupViewImage = page.querySelector('.popup-view-image'); // попап просмотра картинки (3)
const openAuthorPopupBtn = profile.querySelector(".profile__change-button"); // открытие окна профиля (1)
const openCardPopupBtn = profile.querySelector(".profile__add-button"); // открытие окна добавления карточки (2)
const closePopupButtons = page.querySelectorAll(".popup__close-button"); // кнопка закрытия попап (любого)
const submitButton = page.querySelectorAll(".popup__submit-button"); // кнопка сохранения данных в форму (в любом окне)
const editProfile = popupEditAuthor.querySelector(".popup__edit-profile"); // форма редактирования профиля (1)
const nameInput = popupEditAuthor.querySelector(".popup__item:first-child"); // поле редактирования имени (1)
const sublineInput = popupEditAuthor.querySelector(".popup__item:nth-of-type(2)"); // поле редактирования подписи (1)
const profileAuthor = profile.querySelector(".profile__author"); // первоначальное значение имени в профиле (1)
const profileSubline = profile.querySelector(".profile__subline"); // первоначальное значение подписи в профиле (1)
const popupImgUrl = popupEditCard.querySelector('.popup__item_image-url'); // ссылка картинки в карточке (2)
const popupImgName = popupEditCard.querySelector('.popup__item_image-name'); // имя картинки в карточке (2)
const cardsElements = page.querySelector('.elements'); // все карточки с картинками (2)
const templateElement = page.querySelector('.element-template').content; // привязать темплейт к карточке (2)

function renderCard(name, link) { //функция передачи данных карточке
  const cardElement = templateElement.cloneNode(true); // клонируем темплейт
  let cardCaption = cardElement.querySelector('.element__caption');
  let cardImage = cardElement.querySelector('.element__image');
  cardCaption.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  let likeImage = cardElement.querySelector(".element__like-button"); // кнопка лайк в карточке
  likeImage.addEventListener('click', () => {
    likeImage.classList.toggle('element__like-button_active'); // назначить слушатель события нажатия кнопки лайк и присвоения по клику класса "Актив"
  });

  let deleteCard = cardElement.querySelector(".element__trash-button"); // кнопка удаления карточки
  deleteCard.addEventListener('click', () => {
    let deletedEelement = deleteCard.closest(".element"); // назначить выбор удаляемой карточки
    deletedEelement.remove(); // удалить карточку
  });

  cardImage.addEventListener('click', () => { // слушатель события клика на картинку
    popupViewImage.classList.toggle("popup_opened"); // открытие попапа по клику на картинку (3)
    let imageView = popupViewImage.querySelector(".popup__view-image"); // картинка в третьем попапе (3)
    let imageViewTitle = popupViewImage.querySelector(".popup__image-title"); // подпись картинки в попакпе (3)
    imageView.src = link;
    imageView.alt = name;
    imageViewTitle.textContent = name;
  })

  cardsElements.append(cardElement);
};

// передать данные карточек из констант
initialCards.reverse().forEach(item => {
  let name = item.name;
  let link = item.link;

  renderCard(name, link);
});

closePopupButtons.forEach( item => {
  item.addEventListener ('click', (evt) => {
    const eventTarget = evt.target;
    const closePopupButton = eventTarget.closest('.popup');

    toggleForm(closePopupButton);
  });
});

function toggleForm(element) {
  element.classList.toggle("popup_opened");
};

function openedProfile () {
  nameInput.value = profileAuthor.textContent;
  sublineInput.value = profileSubline.textContent;

  toggleForm(popupEditAuthor);
};

function formSubmitHandler (evt) { // назначить функцию отправки формы автора
  evt.preventDefault();
  profileAuthor.textContent = nameInput.value;
  profileSubline.textContent = sublineInput.value;
  
  toggleForm(popupEditAuthor);
};

function cardSubmitHandler (evt) { // добавить функцию заполнения карточки пользователем
  evt.preventDefault();
  let newPopupImgName = popupImgName.value;
  let newPopupImgUrl = popupImgUrl.value;
  renderCard(newPopupImgName, newPopupImgUrl);

  toggleForm(popupEditCard);
};

openAuthorPopupBtn.addEventListener('submit', formSubmitHandler);

openCardPopupBtn.addEventListener('click', () => {
  toggleForm(popupEditCard);
});

editProfile.addEventListener('submit', formSubmitHandler);