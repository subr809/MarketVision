import {COIN_API_KEY, COIN_API_KEY_NOMICS, COIN_API_KEY_OG} from "../../config/coinapi";
import axios from 'axios';

export const getCrypto = async (topic) => {
  const response = await fetch(
      `https://min-api.cryptocompare.com/data/all/coinlist`
    );
    const json = await response.json();
    return json.Data[topic].Description;
}
  
export const cryptoStats = async (topic) => {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${topic}&tsyms=USD&api_key=${COIN_API_KEY}`
    );
    const json = await response.json();
    return json.DISPLAY[topic].USD;
}

export const cryptoSentiment = async (topic) => {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest?fsym=${topic}&api_key=${COIN_API_KEY}`
    );
    const json = await response.json();
    return json.Data.inOutVar.sentiment;
}

export const cryptoATH = async (topic) => {
  const response = await fetch(
    `https://api.nomics.com/v1/currencies/ticker?key=${COIN_API_KEY_NOMICS}&ids=${topic}&interval=1d,30d&per-page=100&page=1`
    );
    const json = await response.json();
    return parseFloat(json[0].high).toFixed(2);
}

export const graphStats = async (topic) => {
  const response = await fetch(
    `https://rest.coinapi.io/v1/ohlcv/${topic}/USD/history?period_id=1MTH&time_start=2015-04-01T00:00:00&apikey=${COIN_API_KEY_OG}`
    );
      const json = await response.json();
      var dps = [];
      for (var i = 0; i < json.length; i++) {
          dps.push({
            x: new Date(json[i].time_close),
            y: Number(json[i].price_close)
          });
        }
      return dps;
}

export const retrieveNews = async (topic) => {
  console.log("Hello")
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=${topic}&api_key=${COIN_API_KEY}`
  );   
  console.log(response);
  const json = await response.json();
  return json.Data;
}
