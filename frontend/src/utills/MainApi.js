import { MAIN_API_URL } from './constants';

class MainApi {
  constructor({ baseUrl, noAuthHeaders, authHeaders }) {
    this._baseUrl = baseUrl;
    this._noAuthHeaders = noAuthHeaders;
    this._authHeaders = authHeaders;
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._authHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  updateUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._authHeaders(),
      body: JSON.stringify({ name, email }),
    }).then((res) => this._checkResponse(res));
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._noAuthHeaders,
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._checkResponse(res));
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._noAuthHeaders,
      body: JSON.stringify({ email, password }),
    })
      .then((res) => this._checkResponse(res))
      .then((data) => {
        return data;
      });
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._authHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  getUsersMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._authHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  saveMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._authHeaders(),
      body: JSON.stringify(movieData),
    }).then((res) => this._checkResponse(res));
  }

  deleteMovies(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._authHeaders(),
    }).then((res) => this._checkResponse(res));
  }
}

export const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  authHeaders: () => ({
    authorization: 'Bearer ' + localStorage.getItem('jwt'),
    'Content-Type': 'application/json',
  }),
  noAuthHeaders: {
    'Content-Type': 'application/json',
  },
});
