export class NewsCard {
  constructor(props, api, container, token) {
    const {
      title,
      text,
      source,
      date,
      link,
      image,
    } = props;

    this.props = props;
    this.title = title;
    this.text = text;
    this.source = source;
    this.date = date;
    this.link = link;
    this.image = image;
    this.api = api;
    this.container = container;
    this.token = token;
  }

  createArticle() {
    const html = `<div class="article">
            <div class="article__info article__info_main">
              <div class="article__icon article__icon_save">
                <p class="article__message article__message_save article__message_not-visible">Войдите, чтобы сохранять статьи</p>
              </div>
            </div>
            <img class="article__image" alt="image" src=${this.image}>
            <div class="article__container">
              <p class="article__date">${this.date}</p>
              <h2 class="article__title">${this.title}</h2>
              <p class="article__text">${this.text}</p>
            </div>
            <p class="article__source">${this.source}</p>
          </div>`;
    this.container.insertAdjacentHTML('beforeend', html);

    const article = this.container.lastElementChild;
    this.article = article;

    const icon = this.article.querySelector('.article__message_save');
    this.icon = icon;
    // this.icon.addEventListener('click', this._addArticle(this.props, this.token, icon).bind(this));

    return this.container;
  }

  _addArticle(art, token, elem) {
    this.api.createArticle(art, token);
    elem.classList.remove('.article__icon_save');
    elem.classList.add('.article__icon_save-auth');
  }

  // remove(event) {
  //   if (window.confirm('Вы действительно хотите удалить статью?')) {
  //     const id = (event.target.closest('.article')).id;
  //     //apiMesto.deleteCard(id);
  //     this.api.deleteCard(id);
  //     this.container.removeChild(event.target.closest('.place-card'));
  //   }
  // }
}
