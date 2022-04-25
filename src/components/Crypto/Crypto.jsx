import React from "react";
import CryptoRow from './CryptoRow.js';
import { Table, Card, Button } from 'reactstrap';
import SearchBar from "./cryptoSearch.js";
import { Link } from 'react-router-dom';
import CryptoGraph from "./cryptoGraph.js";
import './Crypto.css'
import ExchangeRate from "./ExchangeRate.js";
import CryptoNews from "./CryptoNews.js";

function Crypto() {
  return (
    <div className="Crypto">
      <div className="container">
        <div id="block1">
          <div class="search-bar"><SearchBar /></div>
        </div>
        <div class="crypto-graph">
            <CryptoGraph />
            <div><Link to={{ pathname: "https://nomics.com/" }} target="_blank"><p style={{color: "black"}}>Crypto Market Cap & Pricing Data Provided By Nomics</p></Link></div>
        </div>
        <div class="default-column">
          <h1 id='title'>Top Volume (24 Hours)</h1>
          <div class="crypto-table" style={{marginRight:"0"}}>
            <Table borderless hover style={{width: "100%"}}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>24 Hour High</th>
                <th>24 Hour Change</th>
                <th>24 Hour Volume</th>
              </tr>
              </thead>
              <CryptoRow/>  
            </Table>
          </div>
          <div class="default-news">
              <CryptoNews symbol=""/>
          </div>
          <ExchangeRate />
        </div>
      </div>
    </div>
  );
}

export default Crypto;