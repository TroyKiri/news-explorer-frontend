export class NewsCardList {
  constructor(container, preloader) {
    this.container = container;
    this.preloader = preloader;
  }

  showResults() {
    this._clearResults();
    this._setResults();
  }

  renderPreloader() {
    this._clearResults();
    this._setPreloader();
  }

  _clearResults() {
    this.container.innerHTML = '';
  }

  _setPreloader() {
    this.container.appendChild(this.preloader);
    this.preloader.style.display = 'block';
  }

  _setResults() {
    this.container.style.display = 'flex';
  }
}
