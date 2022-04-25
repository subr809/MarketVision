import axios from 'axios';
import React, { Component } from 'react';
import {COIN_API_KEY} from "../../config/coinapi";
import { Link } from 'react-router-dom';
//import { iex } from '../config/iex.js'
class CryptoRow extends Component{

    constructor(props){
        super(props)
        this.state = {
            cryptoData: [],
        }
    }

    componentDidMount(){
        axios.get(
          //`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,Dogecoin,LTC,XLM,ADA,SAFEMOON,DENT,BNB,USDC,GRT&tsyms=USD&api_key=${COIN_API_KEY}`
          `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${COIN_API_KEY}` //Toplist by 24H Volume Full Data
        ).then(res => {
            const cryptos = res.data;
            console.log(cryptos.Data);
            this.setState({cryptoData: cryptos.Data});
        })
    }
    renderTableData() {
        return this.state.cryptoData.map((key,index) => {
           return (
            <tr key={index}>
                <td id="row-element"> {index+1} </td>
                <td> <Link to={{ pathname: "/Crypto/" + this.state.cryptoData[index].CoinInfo.FullName, state: {nameofCoin: this.state.cryptoData[index].CoinInfo.FullName}}}> 
                <div id="row-img"><img class="table-img" src={'https://www.cryptocompare.com' + this.state.cryptoData[index].DISPLAY.USD.IMAGEURL}></img><div id="tb-img"> {this.state.cryptoData[index].CoinInfo.FullName}</div></div></Link></td>
                <td><div id="row-element">{this.state.cryptoData[index].DISPLAY.USD.PRICE}</div></td>
                <td><div id="row-element">{this.state.cryptoData[index].DISPLAY.USD.HIGH24HOUR}</div></td>
                <td><div id="row-element">{this.state.cryptoData[index].DISPLAY.USD.CHANGE24HOUR} ({this.state.cryptoData[index].DISPLAY.USD.CHANGEPCT24HOUR}%)</div></td>
                <td><div id="row-element">{this.state.cryptoData[index].DISPLAY.USD.TOTALVOLUME24HTO}</div></td>
            </tr>
           )
        })
     }
    renderTableHeader() {
        let header = Object.keys(this.state.cryptoData[0]) 
        return header.map((key,index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    render(){
        return (
            <tbody>{this.renderTableData()}</tbody>
        )
    }
}

export default CryptoRow;