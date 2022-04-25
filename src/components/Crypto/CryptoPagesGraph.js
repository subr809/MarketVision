import React from 'react';
//import Plot from 'react-plotly.js';
import CanvasJSReact from '../ChartJS/canvasjs.stock.react';
import {COIN_API_KEY, COIN_API_KEY_NOMICS, COIN_API_KEY_OG} from "../../config/coinapi";
import axios from 'axios';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class CryptoGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints: [], isLoaded: false, nameofCoin: '', symbol: "BTC" };
  }

  componentDidMount() {
    axios.get(
      //`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,Dogecoin,LTC,XLM,ADA,SAFEMOON,DENT,BNB,USDC,GRT&tsyms=USD&api_key=${COIN_API_KEY}`
    `https://rest.coinapi.io/v1/ohlcv/${this.state.symbol}/USD/history?period_id=1MIN&time_start=2021-04-25T00:00:00&apikey=${COIN_API_KEY_OG}`
    ).then(res => {
        var dps = [];
        for (var i = 0; i < res.data.length; i++) {
          dps.push({
            x: new Date(res.data[i].time_close),
            y: Number(res.data[i].price_close)
          });
        }
        this.setState({
          isLoaded: true,
          dataPoints: dps
      })
    })
  }
 
  render() {
    const options = {
      title:{
        text: this.state.symbol + " Price Activity"
      },
      animationEnabled: true,
      theme: "light2",
      subtitles: [{
        text: this.state.symbol + "/USD"
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
          title: "Bitcoin Price",
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
          color: "#f2a900",
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
        <div>
          {
            // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
            this.state.isLoaded && 
            <CanvasJSStockChart containerProps={containerProps} options = {options}
              /* onRef = {ref => this.chart = ref} */
            />
          }
        </div>
      </div>
    );
  }
}

  export default CryptoGraph;