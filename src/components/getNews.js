import { NEWS_API_KEY } from "../config/newsapi";
import {POLY_API} from '../config/polygon.js';

export const getArticles = async (topic, lang) => {
  console.log(topic,lang)
  const response = await fetch(
    //`https://newsapi.org/v2/everything?q=${topic}&sortBy=recent&apiKey=${NEWS_API_KEY}`
    //`http://api.datanews.io/v1/headlines?q=${topic}&sortBy=date&country=us&apiKey=${NEWS_API_KEY}`
    `https://api.polygon.io/v2/reference/news?limit=10&order=descending&sort=published_utc&ticker=${topic}&published_utc.gte=2021-04-26&apiKey=${POLY_API}`
    //`http://api.mediastack.com/v1/news?access_key=${NEWS_API_KEY}&keywords=${topic}&languages=${lang}`
    //`https://bing-news-search1.p.rapidapi.com/news/search?rapidapi-key=${NEWS_API_KEY}&q=${topic}&safeSearch=Off&textFormat=Raw&freshness=Day&setLang=${lang}`
  );
  const json = await response.json();
  console.log(json) 
  return json;
};