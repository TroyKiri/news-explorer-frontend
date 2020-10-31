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
            <img class="article__image" alt="image" src = ${this.image}>
            <a class = "article__link" href = ${this.link} target = "_blank">
              <div class="article__container">
                <p class="article__date">${this.date}</p>
                <h2 class="article__title">${this.title}</h2>
                <p class="article__text">${this.text}</p>
              </div>
            </a>
            <p class="article__source">${this.source}</p>
          </div>`;
    this.container.insertAdjacentHTML('beforeend', html);

    return this.container;
  }
}
