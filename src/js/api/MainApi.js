export class MainApi {
  constructor(config) {
    this.config = config;
  }

  signup(email, password, name) {
    return (fetch(`${this.config.baseUrl}/signup`, {
      method: 'POST',
      headers: this.config.headers,
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
      }),
    }))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  signin() {

  }

  getUserData() {

  }

  getArticles() {

  }

  createArticle() {

  }

  removeArticle() {

  }
}