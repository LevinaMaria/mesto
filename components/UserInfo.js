export class UserInfo {
    constructor ({ userName, userSubline }) {
        this._userName = document.querySelector(userName);
        this._userSubline = document.querySelector(userSubline);
    }
    //возвращает объект с данными пользователя
    getUserInfo () {
        const userInfo = {};
        userInfo.userName = this._userName.textContent;
        userInfo.userSubline = this._userSubline.textContent;
        
        return userInfo;
    }
    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo (inputValues) {
        this._userName.textContent = inputValues.userName;
        this._userSubline.textContent = inputValues.userSubline;
    }
}