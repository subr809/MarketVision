import React from 'react';
import { Form } from "semantic-ui-react";
import {COIN_API_KEY} from "../../config/coinapi";
import axios from 'axios';

/* Page for exchange rate container on default cypto page*/

class ExchangeRate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            cryptoOptions: ["BTC", "ETH", "LTC", "SAFE"], 
            currency1: 'USD', currency2: 'BTC', 
            inputValue: 0.0, outputValue: 0.0, exchangeRate: 0.0
        }
    }

   componentDidMount() {
        axios.get(
            `https://min-api.cryptocompare.com/data/price?fsym=${this.state.currency1}&tsyms=${this.state.currency2}&api_key=${COIN_API_KEY} `
          ).then(res => {
            const cryptos = res.data;
            const c2 = this.state.currency2;
            this.setState({
                exchangeRate: cryptos[c2]
            });
        })
    }

    renderOptions() {
        return this.state.cryptoOptions.map((key,index) => {
            return (
                <option key={index}>{this.state.cryptoOptions[index]}</option>
            )
        });
    }

   onChangeCurrency1 = e => {
        this.setState({ currency1: e.target.value })
        axios.get(
            `https://min-api.cryptocompare.com/data/price?fsym=${e.target.value}&tsyms=${this.state.currency2}&api_key=${COIN_API_KEY} `
          ).then(res => {
            const cryptos = res.data;
            const c2 = this.state.currency2;
            const c = this.state.inputValue*cryptos[c2];
            this.setState({
                outputValue: c
            });
            this.setState({
                exchangeRate: cryptos[c2]
            });
        })
    }
    
    onChangeCurrency2 = e => {
        this.setState({ currency2: e.target.value })
        axios.get(
            `https://min-api.cryptocompare.com/data/price?fsym=${this.state.currency1}&tsyms=${e.target.value}&api_key=${COIN_API_KEY} `
          ).then(res => {
            const cryptos = res.data;
            const c2 = this.state.currency2;
            const c = this.state.inputValue*cryptos[c2];
            console.log("Cryptos: " + cryptos[c2])
            this.setState({
                outputValue: c
            });
            this.setState({
                exchangeRate: cryptos[c2]
            });
        })
    }

    handleInput = e => {
        const output = e.target.value * this.state.exchangeRate;
        this.setState({ inputValue: e.target.value, outputValue: output })
    }

    handleSwap = (e) => {
        const temp = this.state.currency1;
        const temp2 = this.state.currency2;
        const extemp = 1/this.state.exchangeRate;
        this.setState({ exchangeRate: extemp });
        this.setState({ outputValue: this.state.inputValue / this.state.exchangeRate});
        e.preventDefault();
        this.setState ({ currency2: temp, currency1: temp2 });
    }

    render() {
        return (
            <div id="wrapper" class="exchange-rate">
                <h1 id='title1'>Exchange Rate</h1>
                <div class="container">
                <div class="ex-row">
                    <select 
                        value={this.state.currency1} 
                        onChange={this.onChangeCurrency1}
                        style={{height: "37.8px"}} 
                        class="form-control" 
                        name="currency1">
                        <option>USD</option>
                        {this.renderOptions()}
                    </select>
                    <Form.Input style={{width: "70%"}}
                        value={this.state.inputValue}
                        placeholder="Enter Value"
                        name="currency1"
                        onChange={this.handleInput}
                        type="number" step="0.01"
                    />
                </div>
                <div class="ex-row-button">
                    <button class="ex-btn" onClick= {this.handleSwap}>⇅</button>
                </div>
                <div class="ex-row">
                    <select 
                        value={this.state.currency2} 
                        onChange={this.onChangeCurrency2}
                        style={{height: "37.8px"}} 
                        class="form-control" 
                        name="currency2">
                        <option>USD</option>
                        {this.renderOptions()}
                    </select>
                    <Form.Input style={{width: "70%"}}
                        disabled={true}
                        type="number"
                        value={this.state.outputValue}
                    />
                </div>
                <div class="ex-result">
                    {this.state.inputValue} {this.state.currency1} is equivalent to {this.state.outputValue} {this.state.currency2}
                </div>
                </div>
            </div>
        )
    }
}

export default ExchangeRate;