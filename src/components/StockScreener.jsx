import React, {useEffect, useState} from "react";
import { Label } from "reactstrap";
import StockRow from  './StockRow.js';
import {Form} from "semantic-ui-react";
import "./StockeScreener.css";



function StockScreener() {

    function strToFloat(str){
      
    }

    const [sector, setSector] = useState(null);
    const [country, setCountry] = useState(null);
    const [employees, setEmployees] = useState(null);
    const [epsNext5Yr, setEpsNext5Yr] = useState(null);
    const [marketcap, setMarketCap] = useState(null);
    const [epsPrev5Yr, setEpsPrev5Yr] = useState(null);
    const [epsThisYr, setEpsThisYr] = useState(null);
    const [roe, setROE] = useState(null);
    const [roi, setROI] = useState(null);
    const [roa, setROA] = useState(null);
    const [eps, setEPS] = useState(null);
    const [fcf, setFCF] = useState(null);
    const [pe, setPE] = useState(null);
    const [pb, setPB] = useState(null);
    const [divyield, setYield] = useState(null);
    const [debtequity, setDebtEquity] = useState(null);
    const [fundamentalStatsQuery, setQuery] = useState("{fundamentalStats(filterSet:\"{}\"){ticker, sector, country, employees, marketCap, epsNext5Yr, epsPrev5Yr, epsThisYr, roe, roi, roa, eps, freeCashFlowPerShare, priceToEarnings, priceToBook, dividendYield, debtToEquity}}");
    
    function resetFilterSet(){
      setSector(null)
    }

    function createQuery(){
      console.log("Create Query");
      var tempFilterset = "";
      var arr = [sector, country, employees, marketcap, epsNext5Yr, epsPrev5Yr, epsThisYr,
                 roi, roa, roe, eps, fcf, pe, pb, divyield, debtequity];

      for (var i = 0; i < arr.length; i++){
        if(arr[i] == null)
          continue;
        else{
          tempFilterset += arr[i];
        }    
      }
      tempFilterset = tempFilterset.substring(0, tempFilterset.length - 1);

      if (tempFilterset == "")
        return "{fundamentalStats(filterSet:\"{}\"){ticker, sector, country, employees, marketCap, epsNext5Yr, epsPrev5Yr, epsThisYr, roe, roi, roa, eps, freeCashFlowPerShare, priceToEarnings, priceToBook, dividendYield, debtToEquity}}";
      else
        return "{fundamentalStats(filterSet:" + "\"" + tempFilterset + "\"" + ")" + "{ticker, sector, country, employees, marketCap, epsNext5Yr, epsPrev5Yr, epsThisYr, roe, roi, roa, eps, freeCashFlowPerShare, priceToEarnings, priceToBook, dividendYield, debtToEquity}}";
    }

    const [Stocks, setStocks] = useState([]);
    useEffect(() =>{
      getStocks();
    }, []);


    const getStocks = async () => {
      console.log(fundamentalStatsQuery);
      const response = await fetch(
        //`https://newsapi.org/v2/everything?q=${topic}&sortBy=recent&apiKey=${NEWS_API_KEY}`
        //`https://api.opensea.io/api/v1/assets?order_by=sale_dated&order_direction=desc&offset=0&limit=20`
        `http://localhost:8000/graphql`, {method:  'POST',
        headers:{ 'content-type': 'application/json'},
        body:JSON.stringify({query: fundamentalStatsQuery})
        });
      const json = await response.json();
      console.log(json.data.fundamentalStats);
      if (json.data.fundamentalStats == null){
        setStocks([{ticker: "", sector: "", country: "", employees: "", marketCap: "",epsNext5Yr: "", epsPrev5Yr: "", epsThisYr: "", roe: "", roi: "", roa: "", eps: "", freeCashFlowPerShare: "", priceToEarnings: "", priceToBook: "", dividendYield: "", debtToEquity: ""}]);
        console.log(Stocks);
      }
      else{
        console.log(json.data.fundamentalStats);
        setStocks(json.data.fundamentalStats);
      }
    };

    function submitEventHandler(){
      setQuery(createQuery);
      getStocks();
    }

    return (
      <div className="App">
        <div className="container">
          <table className="MyInput">
            <tbody>
              <tr>
                <td>Sector</td>
                <td>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{\&quot;eq\&quot; : {\&quot;sector\&quot; :\&quot;Energy\&quot; } },">Energy</option>
                    <option value="{\&quot;eq\&quot; : {\&quot;sector\&quot; :\&quot;Materials\&quot; } },">Materials</option>
                    <option value="{\&quot;eq\&quot; : {\&quot;sector\&quot; :\&quot;Industrials\&quot; } },">Industrials</option>
                    <option value="{\&quot;eq\&quot; : {\&quot;sector\&quot; :\&quot;Consumer Discretionary\&quot; } },">Consumer Discretionary</option>
                    <option value="{\&quot;eq\&quot; : {\&quot;sector\&quot; :\&quot;Consumer Staples\&quot; } },">Consumer Staples</option>
                    <option value="{\&quot;eq\&quot; : {\&quot;sector\&quot; :\&quot;Health Care\&quot; } },">Health Care</option>
                    <option value="{\&quot;eq\&quot; : {\&quot;sector\&quot; :\&quot;Financials\&quot; } },">Financials</option>
                    <option value="{\&quot;eq\&quot; : {\&quot;sector\&quot; :\&quot;Information Technology\&quot; } },">Information Technology</option>
                  </select>
                </td>
                <td>Country</td>
                <td>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{ \&quot;eq\&quot; : { \&quot;country\&quot; : \&quot;usa\&quot; } },">USA</option>
                    <option value="{ \&quot;eq\&quot; : { \&quot;country\&quot; : \&quot;gbr\&quot; } },">Great Britain</option>
                    <option value="{ \&quot;eq\&quot; : { \&quot;country\&quot; : \&quot;irl\&quot; } },">Ireland</option>
                    <option value="{ \&quot;eq\&quot; : { \&quot;country\&quot; : \&quot;che\&quot; } },">Switzerland</option>
                  </select>
                </td>
                <td>Employees</td>
                <td>
                  <select
                    value={employees} 
                    onChange={(e) => setEmployees(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{\&quot;gt\&quot; : {\&quot;employees\&quot; :\&quot;100000\&quot; } },">over 100000</option>
                    <option value="{\&quot;gt\&quot; : {\&quot;employees\&quot; :\&quot;50000\&quot; } },\&quot;lt\&quot; : {\&quot;employees\&quot; : \&quot;100000 } },">50000 to 100000</option>
                    <option value="{\&quot;gt\&quot; : {\&quot;employees\&quot; :\&quot;10000\&quot; } },\&quot;lt\&quot; : {\&quot;employees\&quot; : \&quot;50000 } },">10000 to 50000</option>
                    <option value="{\&quot;gt\&quot; : {\&quot;employees\&quot; :\&quot;2000\&quot; } },\&quot;lt\&quot; : {\&quot;employees\&quot; : \&quot;10000 } },">2000 to 10000</option>
                    <option value="{\&quot;lt\&quot; : {\&quot;employees\&quot; :\&quot;2000\&quot; } },">under 2000</option>
                  </select>
                </td>
                <td>Market Cap</td>
                <td>
                  <select
                    value={marketcap}
                    onChange={(e) => setMarketCap(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{\&quot;gt\&quot; : {\&quot;marketcap\&quot; :\&quot;200000\&quot; } }">Mega ($200bln+</option>
                    <option value="{\&quot;gt\&quot; : {\&quot;marketcap\&quot; :\&quot;10000\&quot; } },\&quot;lt\&quot; : {\&quot;marketcap\&quot; :\&quot;200000\&quot; } },">Large ($10bln to $200bln)</option>
                    <option value="{\&quot;gt\&quot; : {\&quot;marketcap\&quot; :\&quot;2000\&quot; } },\&quot;lt\&quot; : {\&quot;marketcap\&quot; :\&quot;10000\&quot; } },">Mid ($2bln to $10bln</option>
                    <option value="{\&quot;gt\&quot; : {\&quot;marketcap\&quot; :\&quot;300\&quot; } },\&quot;lt\&quot; : {\&quot;marketcap\&quot; :\&quot;2000\&quot; } },">Small ($300mln to $2bln)</option>
                    <option value="{\&quot;gt\&quot; : {\&quot;marketcap\&quot; :\&quot;50\&quot; } },\&quot;lt\&quot; : {\&quot;marketcap\&quot; :\&quot;300\&quot; } },">Micro ($50mln to $300mln)</option>
                    <option value="{\&quot;lt\&quot; : {\&quot;marketcap\&quot; :\&quot;50\&quot; } },">Nano (under $50mln)</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>EPS Next 5 Yr</td>
                <td>
                  <select
                    value={epsNext5Yr}
                    onChange={(e) => setEpsNext5Yr(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;epsNext5Yr\&quot; : \&quot;0\&quot; } },">Positive (over 0%)</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;epsNext5Yr\&quot; : \&quot;0\&quot; } },">Negative (under 0%)</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;epsNext5Yr\&quot; : \&quot;10\&quot; } },">Over 10%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;epsNext5Yr\&quot; : \&quot;20\&quot; } },">Over 20%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;epsNext5Yr\&quot; : \&quot;30\&quot; } },">Over 30%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;epsNext5Yr\&quot; : \&quot;-10\&quot; } },">Under 10%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;epsNext5Yr\&quot; : \&quot;-20\&quot; } },">Under 20%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;epsNext5Yr\&quot; : \&quot;-30\&quot; } },">Under 30%</option>
                  </select>
                </td>
                <td>EPS Prev 5 Yr</td>
                <td>
                  <select
                    value={epsPrev5Yr}
                    onChange={(e) => setEpsPrev5Yr(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;epsPrev5Yr\&quot; : \&quot;0\&quot; } },">Positive (over 0%)</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;epsPrev5Yr\&quot; : \&quot;0\&quot; } },">Negative (under 0%)</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;epsPrev5Yr\&quot; : \&quot;10\&quot; } },">Over 10%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;epsPrev5Yr\&quot; : \&quot;20\&quot; } },">Over 20%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;epsPrev5Yr\&quot; : \&quot;30\&quot; } },">Over 30%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;epsPrev5Yr\&quot; : \&quot;-10\&quot; } },">Under 10%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;epsPrev5Yr\&quot; : \&quot;-20\&quot; } },">Under 20%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;epsPrev5Yr\&quot; : \&quot;-30\&quot; } },">Under 30%</option>
                  </select>
                </td>
                <td>EPS This Yr</td>
                <td>
                  <select
                    value={epsThisYr}
                    onChange={(e) => setEpsThisYr(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;epsThis5Yr\&quot; : \&quot;0\&quot; } },">Positive (over 0%)</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;epsThis5Yr\&quot; : \&quot;0\&quot; } },">Negative (under 0%)</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;epsThis5Yr\&quot; : \&quot;10\&quot; } },">Over 10%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;epsThis5Yr\&quot; : \&quot;20\&quot; } },">Over 20%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;epsThis5Yr\&quot; : \&quot;30\&quot; } },">Over 30%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;epsThis5Yr\&quot; : \&quot;-10\&quot; } },">Under 10%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;epsThis5Yr\&quot; : \&quot;-20\&quot; } },">Under 20%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;epsThis5Yr\&quot; : \&quot;-30\&quot; } },">Under 30%</option>
                  </select>
                </td>
                <td>ROE</td>
                <td>
                  <select
                    value={roe}
                    onChange={(e) => setROE(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;roe\&quot; : \&quot;0\&quot; } },">Positive (over 0%)</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;roe\&quot; : \&quot;0\&quot; } },">Negative (under 0%)</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;roe\&quot; : \&quot;.10\&quot; } },">Over 10%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;roe\&quot; : \&quot;.20\&quot; } },">Over 20%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;roe\&quot; : \&quot;.30\&quot; } },">Over 30%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;roe\&quot; : \&quot;-.10\&quot; } },">Under -10%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;roe\&quot; : \&quot;-.20\&quot; } },">Under -20%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;roe\&quot; : \&quot;-.30\&quot; } },">Under -30%</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>ROI</td>
                <td>
                  <select
                    value={roi}
                    onChange={(e) => setROI(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;roi\&quot; : \&quot;0\&quot; } },">Positive (over 0%)</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;roi\&quot; : \&quot;0\&quot; } },">Negative (under 0%)</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;roi\&quot; : \&quot;.10\&quot; } },">Over 10%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;roi\&quot; : \&quot;.20\&quot; } },">Over 20%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;roi\&quot; : \&quot;.30\&quot; } },">Over 30%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;roi\&quot; : \&quot;-.10\&quot; } },">Under 10%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;roi\&quot; : \&quot;-.20\&quot; } },">Under 20%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;roi\&quot; : \&quot;-.30\&quot; } },">Under 30%</option>
                  </select>
                </td>
                <td>ROA</td>
                <td>
                  <select
                    value={roa}
                    onChange={(e) => setROA(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;roa\&quot; : \&quot;0\&quot; } },">Positive (over 0%)</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;roa\&quot; : \&quot;0\&quot; } },">Negative (under 0%)</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;roa\&quot; : \&quot;.10\&quot; } },">Over 10%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;roa\&quot; : \&quot;.20\&quot; } },">Over 20%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;roa\&quot; : \&quot;.30\&quot; } },">Over 30%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;roa\&quot; : \&quot;-.10\&quot; } },">Under 10%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;roa\&quot; : \&quot;-.20\&quot; } },">Under 20%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;roa\&quot; : \&quot;-.30\&quot; } },">Under 30%</option>
                  </select>
                </td>
                <td>EPS</td>
                <td>
                  <select
                    value={eps}
                    onChange={(e) => setEPS(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;eps\&quot; : \&quot;0\&quot; } },">Positive (over 0%)</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;eps\&quot; : \&quot;0\&quot; } },">Negative (under 0%)</option>
                  </select>
                </td>
                <td>FCF</td>
                <td>
                  <select
                    value={fcf}
                    onChange={(e) => setFCF(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;freeCashFlowPerShare\&quot; : \&quot;0\&quot; } },">Positive (over 0%)</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;freeCashFlowPerShare\&quot; : \&quot;0\&quot; } },">Negative (under 0%)</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>PE Ratio</td>
                <td>
                  <select
                    value={pe}
                    onChange={(e) => setPE(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;priceToEarnings\&quot; : \&quot;50\&quot; } },">High (over 50)</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;priceToEarnings\&quot; : \&quot;10\&quot; } },">Low (under 10)</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;priceToEarnings\&quot; : \&quot;20\&quot; } },">Under 20</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;priceToEarnings\&quot; : \&quot;30\&quot; } },">Under 30</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;priceToEarnings\&quot; : \&quot;40\&quot; } },">Under 40</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;priceToEarnings\&quot; : \&quot;10\&quot; } },">Over 10</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;priceToEarnings\&quot; : \&quot;20\&quot; } },">Over 20</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;priceToEarnings\&quot; : \&quot;30\&quot; } },">Over 30</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;priceToEarnings\&quot; : \&quot;40\&quot; } },">Over 40</option>
                  </select>
                </td>
                <td>PB Ratio</td>
                <td>
                  <select
                    value={pb}
                    onChange={(e) => setPB(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;priceToBook\&quot; : \&quot;5\&quot; } },">High, Over 5</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;priceToBook\&quot; : \&quot;1\&quot; } },">Low, Under 1</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;priceToBook\&quot; : \&quot;2\&quot; } },">Under 2</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;priceToBook\&quot; : \&quot;3\&quot; } },">Under 3</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;priceToBook\&quot; : \&quot;4\&quot; } },">Under 4</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;priceToBook\&quot; : \&quot;5\&quot; } },">Under 5</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;priceToBook\&quot; : \&quot;1\&quot; } },">Over 1</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;priceToBook\&quot; : \&quot;2\&quot; } },">Over 2</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;priceToBook\&quot; : \&quot;3\&quot; } },">Over 3</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;priceToBook\&quot; : \&quot;4\&quot; } },">Over 4</option>
                  </select>
                </td>
                <td>Dividend Yield</td>
                <td>
                  <select
                    value={divyield}
                    onChange={(e) => setYield(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;Dividend Yield\&quot; : \&quot;.01\&quot; } },">Low (Under 1%)</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;Dividend Yield\&quot; : \&quot;.05\&quot; } },">High (over 5%)</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;Dividend Yield\&quot; : \&quot;.01\&quot; } },">Over 1%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;Dividend Yield\&quot; : \&quot;.02\&quot; } },">Over 2%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;Dividend Yield\&quot; : \&quot;.03\&quot; } },">Over 3%</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;Dividend Yield\&quot; : \&quot;.04\&quot; } },">Over 4%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;Dividend Yield\&quot; : \&quot;.02\&quot; } },">Under 2%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;Dividend Yield\&quot; : \&quot;.03\&quot; } },">Under 3%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;Dividend Yield\&quot; : \&quot;.04\&quot; } },">Under 4%</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;Dividend Yield\&quot; : \&quot;.05\&quot; } },">Under 5%</option>
                  </select>
                </td>
                <td>Debt to Equity</td>
                <td>
                  <select
                    value={debtequity}
                    onChange={(e) => setDebtEquity(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;DebtEquity\&quot; : \&quot;1\&quot; } },">High (over 1)</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;DebtEquity\&quot; : \&quot;.1\&quot; } },">Low (under .1)</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;DebtEquity\&quot; : \&quot;.25\&quot; } },">Over .25</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;DebtEquity\&quot; : \&quot;.5\&quot; } },">Over .5</option>
                    <option value="{ \&quot;gt\&quot; : { \&quot;DebtEquity\&quot; : \&quot;.75\&quot; } },">Over .75</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;DebtEquity\&quot; : \&quot;1\&quot; } },">Under 1</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;DebtEquity\&quot; : \&quot;.75\&quot; } },">Under .75</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;DebtEquity\&quot; : \&quot;.5\&quot; } },">Under .5</option>
                    <option value="{ \&quot;lt\&quot; : { \&quot;DebtEquity\&quot; : \&quot;.25\&quot; } },">Under .25</option>
                  </select>
                </td>

              </tr>

            </tbody>

            
            

          </table>

        <button className="submitButton" onClick={() => submitEventHandler()}>Submit</button>  
        
        </div>
        
        <div className="container2">
          <table className="data">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Sector</th>
                <th>Country</th>
                <th>Employees</th>
                <th>Market Cap</th>
                <th>EPSNext5Yr</th>
                <th>EPSPrev5Yr</th>
                <th>EPSThisYr</th>
                <th>ROE</th>
                <th>ROI</th>
                <th>ROA</th>
                <th>EPS</th>
                <th>FCF</th>
                <th>PE Ratio</th>
                <th>PB Ratio</th>
                <th>Dividend Yield</th>
                <th>Debt to Equity</th>
              </tr>
            </thead>
            <tbody>
            {Stocks.map(Stocks =>(
              
              <StockRow ticker={Stocks.ticker} sector={Stocks.sector} country ={Stocks.country}
               employees={Stocks.employees} marketcap={parseFloat(Stocks.marketCap).toFixed(3)} epsNext5Yr={parseFloat(Stocks.epsNext5Yr).toFixed(2)}
               epsPrev5Yr={parseFloat(Stocks.epsPrev5Yr).toFixed(2)} epsThisYr={parseFloat(Stocks.epsThisYr).toFixed(2)} roe={parseFloat(Stocks.roe).toFixed(2)} roi={parseFloat(Stocks.roi).toFixed(2)}
               roa={parseFloat(Stocks.roa).toFixed(2)} eps={parseFloat(Stocks.eps).toFixed(2)} fcf={parseFloat(Stocks.freeCashFlowPerShare).toFixed(2)} pe={parseFloat(Stocks.priceToEarnings).toFixed(2)} pb={parseFloat(Stocks.priceToBook).toFixed(2)} divyield={parseFloat(Stocks.dividendYield).toFixed(2)}
               debtequity={parseFloat(Stocks.debtToEquity).toFixed(2)}/>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  export default StockScreener;
