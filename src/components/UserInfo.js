export class UserInfo {
  constructor(data) {
    this._userName = document.querySelector(data.name);
    this._userSubline = document.querySelector(data.about);
    this._userAvatar = document.querySelector(data.avatar);
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      about: this._userSubline.textContent,
      avatar: this._userAvatar.src,
      _id: this._id,
    };
    return userInfo;
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(inputValues) {
    this._userName.textContent = inputValues.name;
    this._userSubline.textContent = inputValues.about;
    this._userAvatar.src = inputValues.avatar;
    this._id = inputValues._id;
  }
}
