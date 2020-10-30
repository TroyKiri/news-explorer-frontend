export class NewsApi {
  constructor(props) {
    const {
      url,
      apiKey,
      pageSize,
      amountDays,
    } = props;

    this._url = url;
    this._apiKey = apiKey;
    this._pageSize = pageSize;
    this._amountDays = amountDays;

    this._initDates(this._amountDays);
  }

  _initDates(amountDays) {
    this._date = new Date();
    this._from = new Date(+this._date - 3600 * 24 * 1000 * amountDays).toISOString().slice(0, 19);
    this._to = this._date.toISOString().slice(0, 19);
  }

  getNews(request) {
    const errorNotConnect = 'Во время запроса произошла ошибка';
    return fetch(
      `${this._url}?q=${request}&from=${this._from}&to=${this._to}&pageSize=${this._pageSize}&apiKey=${this._apiKey}`,
    )
      .then((res) => res.json())
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          console.log(err);
          return new Error(errorNotConnect);
        }
        return new Error(err);
      });
  }
}
