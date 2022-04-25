import React, { useEffect, useState } from "react";
import SearchBar from "./cryptoSearch.js";
import { Link } from 'react-router-dom';

import { getCrypto, cryptoStats, cryptoSentiment, cryptoATH, retrieveNews, graphStats } from "./getCrypto.js";
import CanvasJSReact from '../ChartJS/canvasjs.stock.react';
import InfoIcon from "../InfoIcon.js";
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
const cryptocurrencies = require('cryptocurrencies');

function CryptoPages(props) {
    const [cryptoNews, setNews] = useState([]);
    const [imageURL, setImageURL] = useState(""); const [nameofCoin, setCoinName] = useState(cryptocurrencies[props.match.params.symbol]);
    const [symbol, setSymbol] = useState(props.match.params.symbol); const [price, setPrice] = useState("");
    const [mktcap, setmktcap] = useState(""); const [isLoaded, setLoading] = useState(false);
    const [vol24, setVol24] = useState(""); const [high, setHigh] = useState("");
    const [sentiment, setSentiment] = useState("N/A"); const [low, setLow] = useState("");
    const [open, setOpen] = useState(""); const [close, setClose] = useState("");
    const [change, setChange] = useState(""); const [open24, setOpen24] = useState("");
    const [high24, setHigh24] = useState(""); const [low24, setLow24] = useState("");
    const [change24, setchange24] = useState(""); const [supply, setSupply] = useState("");
    const [ath, setATH] = useState("N/A"); const [openh, setOpenh] = useState("");
    const [highh, setHighh] = useState(""); const [lowh, setLowh] = useState("");
    const [changeh, setChangeH] = useState(""); const [update, setUpdate] = useState("");
    const [about, setAbout] = useState(""); const [error, setError] = useState("");
    const [dataPoints, setdataPoints] = useState([]);
    useEffect(async() =>{
        getC(props.match.params.symbol);
      }, [props.match.params.symbol]);
    useEffect(async() => {
        renderGraph();
    }, [dataPoints]);
    useEffect(async() => {
        renderArticles();
    }, [cryptoNews]);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const options = {
        title:{
          text: cryptocurrencies[props.match.params.symbol] + " Price Activity"
        },
        theme: "light2",
        subtitles: [{
          text: props.match.params.symbol + "/USD"
        }],
        charts: [{
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: "MM DD YYYY"
            }
          },
          axisY: {
            title:  symbol + " Price",
            prefix: "$",
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: "$##,###.##"
            }
          },
          toolTip: {
            shared: true
          },
          data: [{
            name: "Price (in USD)",
            type: "splineArea",
            color: 'grey',
            yValueFormatString: "$##,###.##",
            xValueFormatString: "MM DD YYYY",
            dataPoints: dataPoints
          }]
        }],
      };
    const containerProps = {
        width: "98%",
        height: "535px",
        margin: "auto",
        zoomEnabled: true,
      };

    const renderGraph = () => {
        console.log(dataPoints);
        if (dataPoints == "") {
            return (
                <div> 
                    <div style={{width: "98%", height: "535px", display: "flex"}}>
                        <p style={{fontSize: "40px",textAlign: "center", margin: "0 auto", marginTop: "27%"}}> Chart unavailable </p>
                    </div>
                </div>
            )
        }
        return (
        <div> 
            <div>
                {
                    isLoaded && 
                    <CanvasJSStockChart containerProps={containerProps} options={options}/>
                }
            </div>
      </div>
        )
    }

    const renderArticles = () => {
        if (cryptoNews == '') {
            return (
                <div class="news-container" style={{width: "95.5%", display: "flex", textAlign: "center"}}> 
                    <div class="news-body" style={{fontSize: "40px", textAlign: "center", margin: "0 auto"}}>
                        <div>
                            <p style={{marginTop: "10%"}}>No news available at the moment</p>
                        </div>
                    </div>
                </div>
            )
        }
        return cryptoNews.map((key,index) => {
            return (
                <div key={index}>
                    <Link to={{ pathname: cryptoNews[index].url }} target="_blank">
                        <div class="news-container"> 
                            <div class="news-image">
                            <img src={cryptoNews[index].imageurl} />
                            <p style={({ marginLeft: '5px', marginTop: '2px' })}> Source: {cryptoNews[index].source_info.name} </p>
                            </div>
                            <div class="news-right">
                                <div class="news-title">
                                <h3> {cryptoNews[index].title} </h3>
                                </div>
                                <div class="news-body">
                                    <p dangerouslySetInnerHTML={{__html: cryptoNews[index].body}} />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
         })
    }

    const getC = async (topic) => {
        try {
            setLoading(false);
            setSymbol(props.match.params.symbol);
            setCoinName(cryptocurrencies[props.match.params.symbol])
            setLoading(true);
            const response = await getCrypto(topic);
            setAbout(response);
            const response1 = await cryptoStats(topic);
            setImageURL('https://www.cryptocompare.com' + response1.IMAGEURL);
            setPrice(response1.PRICE);
            setmktcap(response1.MKTCAP);
            setVol24(response1.VOLUME24HOURTO);
            setOpen(response1.OPENDAY);
            setHigh(response1.HIGHDAY);
            setLow(response1.LOWDAY);
            setChange(response1.CHANGEDAY);
            setOpenh(response1.OPENHOUR);
            setHighh(response1.HIGHHOUR);
            setLowh(response1.LOWHOUR);
            setChangeH(response1.CHANGEHOUR);
            setOpen24(response1.OPEN24HOUR);
            setHigh24(response1.HIGH24HOUR);
            setLow24(response1.LOW24HOUR);
            setchange24(response1.CHANGE24HOUR);
            setSupply(response1.SUPPLY);
            setUpdate(response1.LASTUPDATE);
            const response2 = await cryptoSentiment(topic);
            setSentiment(response2);
            const response3 = await cryptoATH(topic);
            setATH("$" + numberWithCommas(response3));
            const response4 = await retrieveNews(topic);
            setNews(response4);
            const response5 = await graphStats(topic);
            setdataPoints(response5);
        } catch (error) {
            setError("Error found");
        }
        setLoading(true);
    }
        return (
            <div className="Crypto-cp">
               <div className="container">
                    <div class="search-bar"><SearchBar /></div>
                    <h2 id='title-cp'> {cryptocurrencies[props.match.params.symbol]} ({props.match.params.symbol})<img id="cp-page-img" src={imageURL}></img></h2>
                    <div class="topline"> 
                        <div class="top-element"><div class="cp-label">Price:<InfoIcon message="Current price of crypto token" />
                        </div><div class="element">{price}</div></div>
                        <div class="top-element"><div class="cp-label">Market Cap:<InfoIcon message="Total value of the coins that have been mined" /></div><div class="element">{mktcap}</div></div>
                        <div class="top-element"><div class="cp-label">24 Hour Volume:<InfoIcon message="Total value of coins traded in the last 24 hours (includes buys and sells)" /></div><div class="element">{vol24}</div></div>
                        <div class="top-element"><div class="cp-label">Sentiment:<InfoIcon message="This momentum signal calculates the net change of in/out of the money addresses, if the number of 'In the Money' addresses is increasing this would be a bullish signal. In the money means addresses that would make a profit on the tokens they hold because they acquired the tokens at a lower price."  /></div><div class="element">{sentiment}</div></div>
                    </div>
                        <div class="about">
                            <div class="container">
                            <h1 id='title1'>About</h1>
                            <p dangerouslySetInnerHTML={{__html: about}} />
                            <p style={{fontSize: "15px", float: "right", marginRight: "2px"}}>Provided by CryptoCompare</p>
                        </div>
                    </div>
                    <div id="block-cp">
                        <div class="crypto-graph1">
                          {renderGraph()}
                        </div>
                        <div class="sideline">
                            <div class="col1">
                                <div class="stat"><div class="cp-label">Open (Day): 
                                {/*Info Icon */}
                                <InfoIcon />
                                </div><div class="element">
                                {open}</div>
                                </div>

                                <div class="stat"><div class="cp-label">High (Day):<InfoIcon message="Highest price in the day"/></div><div class="element">
                                </div><div class="element">
                                {high}</div></div>

                                <div class="stat"><div class="cp-label">Open (H):<InfoIcon message=" hour"/></div><div class="element">
                                </div><div class="element">    
                                {openh}</div></div>

                                <div class="stat"><div class="cp-label">High (H):<InfoIcon message="Highest price in the last hour"/></div><div class="element">
                                </div><div class="element">
                                {highh}</div></div>

                                <div class="stat"><div class="cp-label">Open (24H):<InfoIcon message="Price 24 hours ago"/></div><div class="element">
                                </div><div class="element">
                                {open24}</div></div>

                                <div class="stat"><div class="cp-label">High (24H): <InfoIcon message="Highest price over the last 24 hours"/></div><div class="element">
                               </div><div class="element">
                                {high24}</div></div>

                                <div class="stat"><div class="cp-label">Total Supply:<InfoIcon message="Total supply of the coins"/></div><div class="element">
                                </div><div class="element">
                                {supply}</div></div>
                                </div>
                            <div class="col2">
                    
                                <div class="stat"><div class="cp-label">Change (Day):<InfoIcon message="Change in price over the day"/></div><div class="element">
                                </div><div class="element">
                                {change}</div></div>

                                <div class="stat"><div class="cp-label">Low (Day):<InfoIcon message="Lowest price during the day"/></div><div class="element">
                                </div><div class="element">
                                {low}</div></div>  
                                
                                <div class="stat"><div class="cp-label">Change (H):<InfoIcon message="Change in price over the last hour"/></div><div class="element">
                                </div><div class="element">
                                {changeh}</div></div>

                                <div class="stat"><div class="cp-label">Low (H):<InfoIcon message="Lowest value over the last hour"/></div><div class="element">
                                </div><div class="element">
                                {lowh}</div></div> 
                                <div class="stat"><div class="cp-label">Change (24H):<InfoIcon message="Change in price over the last 24 hours"/></div><div class="element">{change24}</div></div>
                                <div class="stat"><div class="cp-label">Low (24H):<InfoIcon message="Lowest price over the last 24 hours"/></div><div class="element">{low24}</div></div>
                                <div class="stat"><div class="cp-label">ATH:<InfoIcon message="Highest price coin has ever reached"/></div><div class="element">{ath}</div></div>
                            </div>
                        </div>
                        <p class="update" style={{fontSize: "15px",  marginRight: "5px"}}>Last Update: {update}</p>
                    </div>
                    <div class="news">
                        <div class="horizontal-container">
                            {renderArticles()}
                            {console.log("Return")}
                        </div>
                    </div>
                </div>
            </div>
        )      
}

export default CryptoPages;