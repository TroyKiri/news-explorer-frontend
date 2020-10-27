export class MainApi {
  constructor(config) {
    this.config = config;
  }

  // Регистрация нового пользователя

  signup({ email, password, name }) {
    const errorNotConnect = 'Во время запроса произошла ошибка';
    return fetch(`${this.config.baseUrl}/signup`, {
      method: 'POST',
      mode: 'no-cors',
      credentials: 'include',
      headers: this.config.headers,
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
      }),
    })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error(errorNotConnect);
        }
        return new Error(err);
      });
  }

  // Аутентификация полдьзователя

  signin({ email, password }) {
    const errorNotConnect = 'Во время запроса произошла ошибка';
    return fetch(`${this.config.baseUrl}/signin`, {
      method: 'POST',
      headers: this.config.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error(errorNotConnect);
        }
        return new Error(err);
      });
  }

  // Информация о пользователе

  getUserData(token) {
    this.token = token;
    const errorNotConnect = 'Во время запроса произошла ошибка';
    return fetch(`${this.config.baseUrl}/me`, {
      method: 'GET',
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error(errorNotConnect);
        }
        return err;
      });
  }

  // Получение статей

  getArticles(token) {
    this.token = token;
    const errorNotConnect = 'Во время запроса произошла ошибка';
    return fetch(`${this.config.baseUrl}/articles`, {
      method: 'GET',
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error(errorNotConnect);
        }
        return err;
      });
  }

  // Добавление новой статьи

  createArticle(article, token) {
    const errorNotConnect = 'Во время запроса произошла ошибка';
    const {
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    } = article;
    this.token = token;
    return fetch(`${this.config.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error(errorNotConnect);
        }
        return err;
      });
  }

  // Удаление статьи

  removeArticle(id, token) {
    const errorNotConnect = 'Во время запроса произошла ошибка';
    this.token = token;

    return fetch(`${this.config.baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          return new Error(errorNotConnect);
        }
        return err;
      });
  }
}
