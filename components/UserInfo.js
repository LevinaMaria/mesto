export class UserInfo {
    constructor (data) {
        this._userName = document.querySelector(data.name);
        this._userSubline = document.querySelector(data.subline);
    }
    //возвращает объект с данными пользователя
    getUserInfo () {
        const userInfo = {
            name: this._userName.textContent,
            subline: this._userSubline.textContent
        };
        return userInfo;
    }
    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo (inputValues) {
        this._userName.textContent = inputValues.name;
        this._userSubline.textContent = inputValues.subline;
    }
}