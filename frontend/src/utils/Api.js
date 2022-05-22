import { getToken } from './Auth';
class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    
    // getToken() {
    //   return `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg5NjFkNjE0MGE0YjQ3NTQwMjFhNjgiLCJpYXQiOjE2NTMxNzEyMzIsImV4cCI6MTY1Mzc3NjAzMn0.CI92CupsCxMVUj5oT160s0i3Xk-q2b1zxUV3IGxVG3w`;
    // }

    //получить информацию о пользователе
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
          authorization: this.getToken(),
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
          authorization: this.getToken(),
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
          authorization: this.getToken(),
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
          authorization: this.getToken(),
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
          authorization: this.getToken(),
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
          authorization: this.getToken(),
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
  
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

  const api = new Api({

    baseUrl: 'http://localhost:3001',
    headers: {
      authorization: getToken(),
      'Content-Type': 'application/json'
    },
    // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
    // headers: {
    //   authorization: '0d0c1ecf-4cb6-4add-84fe-013c8fefdb82',
    //   'Content-Type': 'application/json'
    // }
  });

  export default api