export const mainConfig = {
  baseUrl: 'https://api.news-explorer-app.ml',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080/',
  },
};

export const newsConfig = {
  url: 'https://newsapi.org/v2/everything',
  apiKey: '9d582e0b249d434c977614897206e75c',
  pageSize: 100,
  amountDays: 7,
};
