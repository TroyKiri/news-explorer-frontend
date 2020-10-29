import { BaseComponent } from './BaseComponent';

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
}
