import React from "react";
import {COIN_API_KEY} from "../../config/coinapi";
import axios from "axios";
import { Link } from 'react-router-dom';
class CryptoNews extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            cryptoNews: [], nameofCoin: this.props.nameofCoin, symbol: this.props.symbol, apiError: '',
        }
    }

    componentDidMount() {
        if (this.state.symbol == '') {
            axios.get(
                `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${COIN_API_KEY}`
              ).then(res => {
                const cryptos = res.data;
                console.log(cryptos.Data);
                this.setState({cryptoNews: cryptos.Data});
            })
        }
        else {
            axios.get(
                `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=${this.state.symbol}&api_key=${COIN_API_KEY}`
            ).then(res => {
                const cryptos = res.data;
                console.log(cryptos.Data);
                this.setState({cryptoNews: cryptos.Data});
            })
        }
    }



    renderArticles () {
        return this.state.cryptoNews.map((key,index) => {
            return (
                <div key={index}>
                    <Link to={{ pathname: this.state.cryptoNews[index].url }} target="_blank">
                        <div class="news-container"> 
                            <div class="news-image">
                            <img src={this.state.cryptoNews[index].imageurl} />
                            <p style={({ marginLeft: '5px', marginTop: '2px' })}> Source: {this.state.cryptoNews[index].source_info.name} </p>
                            </div>
                            <div class="news-right">
                                <div class="news-title">
                                <h3> {this.state.cryptoNews[index].title} </h3>
                                </div>
                                <div class="news-body">
                                    <p dangerouslySetInnerHTML={{__html: this.state.cryptoNews[index].body}} />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
         })
    }
    

    render () {
        return (
            <div class="news">
                 <h1 id='title'>Latest News</h1>
                <div class="horizontal-container">
                    {this.renderArticles()}
                </div>
            </div>
        )
    } 
}

export default CryptoNews;