export class Api {
    constructor (obj){
      this._baseUrl = obj.baseUrl;
      this._headers = obj.headers;
    }
    //Метод для проверки ответа 
  _checkResponse(res) { 
    if (res.ok) { 
      return res.json(); 
    } 
    //Если условие не выполнено, то делаем промис с ошибкой 
    return Promise.reject(`Ошибка: ${res.status}`); 
  }
    //Запрашиваем данные пользователя
  getUserInfo() {
    return fetch ('https://mesto.nomoreparties.co/v1/cohort-46/users/me', {
        method: 'GET',
        headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }
    //Редактируем данные профиля
  editUserInfo (userData) {
    return fetch ('https://mesto.nomoreparties.co/v1/cohort-46/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.subline
      })
    })
    .then(res => this._checkResponse(res))
  }
  
    //Редактируем аватар
  setUserAvatar (userData) {
    return fetch ('https://mesto.nomoreparties.co/v1/cohort-46/users/me/avatar', {
        method: 'PATCH',  
        headers: this._headers,
        body: JSON.stringify({
          avatar: userData.avatar
      })
    })
    .then(res => this._checkResponse(res))
  }  
  getInitialCards(){
    return fetch ('https://mesto.nomoreparties.co/v1/cohort-46/cards', {
      method: 'GET',
      headers: this._headers}
    )
    .then(this._checkResponse)
  }
  addCard (cardData) {
    return fetch ('https://mesto.nomoreparties.co/v1/cohort-46/cards', {
        method: 'POST',  
        headers: this._headers,
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link
      })
    })
    .then(res => this._checkResponse(res))
  }
  deleteCard (cardId) {
    return fetch (`${this._url}/cards/${cardId}`, {
        method: 'DELETE',  
        headers: this._headers
      })
    .then(res => this._checkResponse(res))
  }
  putLike (cardId) {
    return fetch (`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',  
        headers: this._headers
      })
    .then(res => this._checkResponse(res))
  }
  deleteLike (cardId) {
    return fetch (`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',  
        headers: this._headers
      })
    .then(res => this._checkResponse(res))
  }
}