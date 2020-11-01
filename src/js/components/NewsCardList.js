import { BaseComponent } from './BaseComponent';
import { frequentElement } from '../utils/preparationDataArticle';

export class NewsCardList extends BaseComponent {
  constructor(container, preloader, resContainer, buttonShowMore, resTittle, failed) {
    super();
    this.container = container;
    this.preloader = preloader;
    this.resContainer = resContainer;
    this.buttonShowMore = buttonShowMore;
    this.resTittle = resTittle;
    this.failed = failed;
  }

  renderResults(showMore) {
    this.showResults();
    this._setAllElem();

    if (showMore) {
      this.buttonShowMore.addEventListener('click', showMore);
    }
  }

  renderResSavedArticles() {
    this.showResults();
    // this.container.appendChild(this.resTittle);
    this.container.appendChild(this.resContainer);
  }

  // отображение секции results---------------------------------------------------------------------

  showResults() {
    this._clearResults();
    this._setResults();
  }

  _setResults() {
    this.container.style.display = 'flex';
  }

  // отображение прелоудера-------------------------------------------------------------------------

  renderPreloader() {
    this._clearResults();
    this._setPreloader();
  }

  _setPreloader() {
    this.container.appendChild(this.preloader);
    this.preloader.style.display = 'block';
  }

  // Отображение всех элементов секции results------------------------------------------------------

  _setAllElem() {
    this.container.appendChild(this.resTittle);
    this.container.appendChild(this.resContainer);
    this.container.appendChild(this.buttonShowMore);
  }

  // Отображение "ничего не найдено"

  renderError() {
    this._clearResults();
    this.failed.style.display = 'flex';
    this.container.appendChild(this.failed);
  }

  // очистка отображения----------------------------------------------------------------------------

  _clearResults() {
    this.container.innerHTML = '';
  }

  // Отображение кнопки-----------------------------------------------------------------------------

  showMore(isShow) {
    if (isShow) {
      this.buttonShowMore.style.display = 'block';
      // this._showElement(this._showMoreBtn);
    } else {
      this.buttonShowMore.style.display = 'none';
      // this._hideElement(this._showMoreBtn);
    }
  }

  addInfoAboutArticles(myName, amount, articles) {
    const keywordsArr = articles.map((item) => {
      return item.keyword;
    });

    const firstKeyword = frequentElement(keywordsArr);
    const keywordsArrSecond = keywordsArr.filter((item) => !(item === firstKeyword));

    const secondKeyword = frequentElement(keywordsArrSecond);

    const amountKeyword = keywordsArr.filter(function (val, i, arr) {
      return arr.indexOf(val) === i;
    }).length;

    let message;

    if (secondKeyword === undefined) {
      message = `${firstKeyword}`;
    } else if ((amountKeyword - 2) === 0) {
      message = `${firstKeyword}, ${secondKeyword}`;
    } else if ((amountKeyword - 2) >= 1) {
      message = `${firstKeyword}, ${secondKeyword} и ${amountKeyword - 2} другим`;
    }

    const html = `<h3 class="results__save-articles">Сохранённые статьи</h3>
                  <h2 class="results__title results__title_articles">${myName}, у вас ${amount} сохранённых статей</h2>
                  <h3 class="results__keywords">По ключевым словам: <span class="results__keyword">${message}</span></h3>`;
    return this.container.insertAdjacentHTML('afterbegin', html);
  }
}
