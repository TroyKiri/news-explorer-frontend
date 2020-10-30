export const mainConfig = {
  baseUrl: 'https://api.news-explorer-app.ml',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080/',
  },
};

export const newsConfig = {
  // url: 'https://newsapi.org/v2/everything',
  url: 'https://nomoreparties.co/news/v2/everything',
  // apiKey: '9d582e0b249d434c977614897206e75c',
  apiKey: '7d16c950bb184717bd362e205c8b0194',
  pageSize: 100,
  amountDays: 7,
};
