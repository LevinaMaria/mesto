export class UserInfo {
    constructor (data) {
        this._userName = document.querySelector(data.name);
        this._userSubline = document.querySelector(data.subline);
        this._userAvatar = document.querySelector(data.avatar);
    }
    //возвращает объект с данными пользователя
    getUserInfo () {
        const userInfo = {
            name: this._userName.textContent,
            subline: this._userSubline.textContent
        };
        return userInfo;
    }
    //получение user id
    getUserId() {
        return this._userId;
    }
    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo (inputValues) {
        this._userName.textContent = inputValues.name;
        this._userSubline.textContent = inputValues.subline;
        this._userAvatar.src = inputValues.avatar;
        this._userId = inputValues._id;
    }
}