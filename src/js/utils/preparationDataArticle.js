export const preparationDataArticle = function (article, keyword) {
  const articleData = {};
  articleData.keyword = keyword;
  articleData.title = article.title;
  articleData.text = article.description || 'Нет описания';
  articleData.source = article.source.name;
  articleData.date = article.publishedAt;
  articleData.link = article.url;
  articleData.image = article.urlToImage || 'https://www.dom-textilya.ru/images/no_image.png';
  return articleData;
};
