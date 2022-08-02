// шесть карточек из коробки
const london = new URL ("../images/1.JPG", import.meta.url);
const venice = new URL ("../images/2.JPG", import.meta.url);
const simi = new URL ("../images/4.JPG", import.meta.url);
const crimea = new URL ("../images/3.JPG", import.meta.url);
const bat = new URL ("../images/5.JPG", import.meta.url);
const srilanka = new URL ("../images/6.JPG", import.meta.url);

const initialCards = [
  {
    imgName: "Лондон",
    imgUrl: london,
  },
  {
    imgName: "Венеция",
    imgUrl: venice,
  },
  {
    imgName: "о. Сими",
    imgUrl: simi,
  },
  {
    imgName: "Крым",
    imgUrl: crimea,
  },
  {
    imgName: "Бат",
    imgUrl: bat,
  },
  {
    imgName: "Шри-Ланка",
    imgUrl: srilanka
  },
];

export { initialCards };
