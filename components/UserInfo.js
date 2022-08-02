export class UserInfo {
    constructor ({ name, subline }) {
        this._userName = name;
        this._userSubline = subline;
    }
    //возвращает объект с данными пользователя
    getUserInfo () {
        const userInfo = {
            name: this.name.textContent,
            subline: this.subline.textContent
        };
        return userInfo;
    }
    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo (inputValues) {
        this._userName.textContent = inputValues.nameInput;
        this._userSubline.textContent = inputValues.sublineInput;
    }
}