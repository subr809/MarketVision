import React from 'react';
import {COIN_API_KEY_NOMICS} from "../../config/coinapi";
import axios from 'axios';
import CanvasJSReact from '../ChartJS/canvasjs.stock.react';
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class CryptoGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints: [], isLoaded: false, currentVal: 0.00 };
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getCurrentDate() {
    const date = new Date(); 
    const formatted = date.toISOString();
    return formatted
  }

  componentDidMount() {
    axios.get(
      `https://api.nomics.com/v1/market-cap/history?key=${COIN_API_KEY_NOMICS}&start=2013-01-01T00%3A00%3A00Z&end=${this.getCurrentDate()}`
    ).then(res => {
        var dps = [];
        for (var i = 0; i < res.data.length; i++) {
          dps.push({
            x: new Date(res.data[i].timestamp),
            y: Number(res.data[i].market_cap)
          });
          if (i == res.data.length - 1) {
            this.setState({
                currentVal: Number(res.data[i].market_cap)
            });
          }
        }
        console.log(dps)
        this.setState({
          isLoaded: true,
          dataPoints: dps
      })
    })
  }
  
  renderPrice() {return this.state.currentVal;}
  render() {
    const options = {
   //   backgroundColor: "grey",
      title:{
        text: "Cryptocurrency Market Valuation",
        fontFamily: "Times New Roman",
      },
      animationEnabled: true,
      theme: "light2",
      subtitles: [{
        text: "Current Market Valuation is $" + this.numberWithCommas(this.state.currentVal)
      }],
      charts: [{
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM DD YYYY"
          }
        },
        axisY: {
          title: "Total Market Cap",
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
          color: "grey",
          yValueFormatString: "$##,###.##",
          xValueFormatString: "MMM DD YYYY",
          dataPoints: this.state.dataPoints
        }]
      }],
      navigator: {
        slider: {
          minimum: new Date("2017-05-01"),
          maximum: new Date("2021-04-21")
        }
      }
    };
    const containerProps = {
      width: "98%",
      height: "535px",
      margin: "auto",
      zoomEnabled: true,
    };
    return (
      <div>
        <div class="graph">
          {
            this.state.isLoaded && 
            <CanvasJSStockChart containerProps={containerProps} options = {options}
            />
          }
        </div>
      </div>
    );
  }
}

  export default CryptoGraph;