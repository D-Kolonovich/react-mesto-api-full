import { getToken } from './Auth';
class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _getToken = () => {
      return `Bearer ${localStorage.getItem('jwt')}`;
    }

    //получить информацию о пользователе
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: this._getToken(),
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse);
    }

    //получить начальные карты
    getInitialCards() {
      alert(this._baseUrl)
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: this._getToken(),
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse).then(res=>res.data);
    }

    //установить информацию о пользователе
    setUserInfo(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._getToken(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(this._checkResponse);
    }
  
    //установить аватар
    setAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._getToken(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: avatar
        })
      })
      .then(this._checkResponse);
    }
  
    //добавить карту
    addCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._getToken(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          link
        })
      })
      .then(this._checkResponse);
    }
  
    //удалить карту
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._getToken(),
          'Content-Type': 'application/json'
        },
      })
      .then(this._checkResponse);
    }
  
    //установить лайк
    setLikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._getToken(),
          'Content-Type': 'application/json'
        },
      })
      .then(this._checkResponse);
    }
  
    //удалить лайк
    removeLikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._getToken(),
          'Content-Type': 'application/json'
        },
      })
      .then(this._checkResponse);
    }

    changeLikeCardStatus(cardId, isLiked){
      if(!isLiked){
        return this.setLikeCard(cardId)
      }else {
        return this.removeLikeCard(cardId)
      }
    }

    //проверить ответ
    _checkResponse(result) {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  }
  
  // const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
  const baseUrl = 'https://api.dkmesto.students.nomoredomains.xyz' || 'http://localhost:3001';

  const api = new Api({

    baseUrl: baseUrl,
  });

  export default api