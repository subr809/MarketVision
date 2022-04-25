import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import { Button, Form, Container, List, Header, Grid } from "semantic-ui-react";
import {POLY_API} from '../config/polygon.js';
var blinder = require('color-blind');


function Intrinsic() {

  const [ticker, setTicker] = useState("AAPL");
  const [dataX1, setDataX1] = useState([]);
  const [dataX2, setDataX2] = useState([]);
  const [days, setDays] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [intrinsic, setIntrinsic] = useState("");
  const [margin, setMargin] = useState("");
  const [marginQ, setMarginQ] = useState(0);
  const [expected, setExpected] = useState("");
  const [expectedQ, setExpectedQ] = useState(0);
  const [color1, setColor1] = useState("blue");
  const [color2, setColor2] = useState("orange");


  //Change for Intrinsic Data
  useEffect(() =>{
    getMarket();
  }, [query]);

  useEffect(() =>{
    getIntrinsic();
  }, [expectedQ, marginQ]);

  const getMarket = async () => {
    var today = new Date();
    var temp = new Date(new Date().setDate(new Date().getDate()-253))
    var prevYear = String(today.getFullYear()-1) + '-';
    var totalToday = String(today.getFullYear()) + '-';
    if (today.getMonth()+1 < 10){
      totalToday += "0" + String(today.getMonth()+1) + '-';
      prevYear += "0" + String(today.getMonth()+1) + '-';
    } else {
      totalToday += String(today.getMonth()+1) + '-';
      prevYear +=  String(today.getMonth()+1) + '-';
    }

    if (today.getDate()+1 < 10){
      totalToday += "0" + String(today.getDate()+1);
      prevYear += "0" + String(today.getDate()+1);
    } else {
      totalToday += String(today.getDate());
      prevYear += String(today.getDate());
    }
    
    console.log(prevYear);
    console.log(totalToday);
    var getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};
    var daylist = getDaysArray(new Date(temp),new Date(today));
    setDays(daylist.map((v)=>v.toISOString().slice(0,10)));
    const response = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${prevYear}/${totalToday}?unadjusted=false&sort=asc&limit=479&apiKey=${POLY_API}`
      
      );
    const json = await response.json();
    console.log(json.results);
    setDataX1(json.results)
  };



  const handleSearch = event => {
    //console.log(event.target.value);
    setSearch(event.target.value);
    console.log(search)
  };
  const getSearch = event =>{
    event.preventDefault();
    setQuery(search.toUpperCase());
    setTicker(search.toUpperCase());
    setSearch("");
    setExpectedQ(0);
    setMarginQ(0);
  };



  const handleMargin = event => {
    //console.log(event.target.value);
    setMargin(event.target.value);
    console.log(margin)
  };
  const handleExpected = event => {
    //console.log(event.target.value);
    setExpected(event.target.value);
    console.log(expected)
  };
  const getValues = event =>{
    event.preventDefault();
    setExpectedQ(expected);
    setMarginQ(margin);
    setExpected("");
    setMargin("");
  };



  const getIntrinsic = async () => {
    const response = await fetch(
      `http://localhost:8000/graphql`, {method: 'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({query:`{fundamentalStats(filterSet:"{\\\"icontains\\\":{\\\"ticker\\\":\\\"${ticker}\\\"}}"){ticker, eps, epsNext5Yr, priceToEarnings, }}`})
      });
    const json = await response.json();
    const data = json.data.fundamentalStats[0];
    console.log(data);
    var eps = Number(data.eps);
    var year5 = Number(data.epsNext5Yr);
    var pe = Number(data.priceToEarnings);
    var i;
    // console.log(eps);
    // console.log(year5);
    // console.log(pe);


    //Step1
    var newEps = eps;
    for (i = 0; i < 5; i++) {
      newEps *= (1+ year5);
    }

    //Step2
    var projectedPrice = pe *(newEps);

    //Step3
    var newPrice = projectedPrice;
    //console.log("NEWPRICE", newPrice);
    for (i = 0; i < 5; i++) {
      newPrice /= (1+ Number(expectedQ)/100);
    }
    console.log(newPrice);
    var finalValue = newPrice * (1-(Number(marginQ)/100));
    setIntrinsic(finalValue); 
    console.log(finalValue);
    console.log("EXPECTEDQ", expectedQ, "MARGINQ" ,marginQ);
  };

  const handleColors = (e) => {
    if (e.target.value == "Standard color vision") {
      setColor1("blue");
      setColor2("orange");
    } else if (e.target.value == "protanopia") {
      setColor1(String(blinder.protanopia("blue")));
      setColor2(String(blinder.protanopia("orange")));
    } else if (e.target.value == "deuteranopia") {
      setColor1(String(blinder.deuteranopia("blue")));
      setColor2(String(blinder.deuteranopia("orange")));
    } else if (e.target.value == "tritanopia") {
      setColor1(String(blinder.tritanopia("blue")));
      setColor2(String(blinder.tritanopia("orange")));
    } 
  }
  
  return (
    <div className="Intrinsic">
      <Header as="h4" style={{ textAlign: "center", margin: 20 }}></Header>
      <select onChange={handleColors} defaultValue="Standard color vision">
        {["Standard color vision", "protanopia","deuteranopia", "tritanopia"].map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
      <Header as="h4" style={{ textAlign: "center", margin: 20 }}></Header>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form onSubmit={getSearch}>
            <Form.Group>
              <Form.Input
                placeholder="Search Ticker"
                name="topic"
                value={search}
                onChange={handleSearch}
              />
              <Button type="submit" color="green">
                Search
              </Button>
            </Form.Group>
          </Form>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <Form onSubmit={getValues}>
            <Form.Group>
              <Form.Input
                placeholder="Margin of safety %"
                name="topic"
                value={margin}
                onChange={handleMargin}
              />
              <Form.Input
                placeholder="Expected Return %"
                name="topic"
                value={expected}
                onChange={handleExpected}
              />
              <Button onClick={() => getIntrinsic()} type="submit" color="green">
                Calculate Intrinsic Value
              </Button>
            </Form.Group>
          </Form>
        </div>
        {marginQ == 0 && expectedQ == 0 && (<Header as="h4" style={{ textAlign: "center", margin: 20 }}></Header>)}
        {(marginQ > 0 || expectedQ > 0) && (<Header as="h4" style={{ textAlign: "center", margin: 20 }}>Intrinsic Value: {Math.round(Number(intrinsic)*100)/100} </Header>)}
        {(marginQ > 0 || expectedQ > 0) && (
          <Plot
          data={[
            {
              x: days,
              y: dataX1.map(a => a.c),
              
              type: 'scatter',
              mode: 'lines',
              name: 'Market Value',
              line: {
                color: `${color1}`,
                width: 3
              }
            },
            {
              x: days,
              y: Array(253).fill(Number(intrinsic)),
              
              type: 'scatter',
              mode: 'lines',
              name: 'Intrinsic Value',
              line: {
                color: `${color2}`,
                width: 3
              }
            },
          ]}
          layout={ { width: 1000, height: 750, title: `${ticker} Market Value vs. Intrinsic Value Graph`} }
        />
        )}
        {marginQ == 0 && expectedQ == 0 && (
          <Plot
          data={[
            {
              x: days,
              y: dataX1.map(a => a.c),
              
              type: 'scatter',
              mode: 'lines',
              name: 'Market Value',
              line: {
                color: `${color1}`,
                width: 3
              }
            },
          ]}
          layout={ { width: 1000, height: 750, title: `${ticker} Market Value Graph`} }
        />
        )}
    </div>
  );
}

export default Intrinsic;