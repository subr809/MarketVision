import React from 'react';
import SearchBar from "./cryptoSearch.js";
import { Header } from "semantic-ui-react";


class eachCryptoPage extends React.Component {
    state = {
        nameofCoin: "",
        articles: [],
        apiError: "",
        loading: false,
    };

    addCoin = async (coin) => {
        this.setState({ loading: true });
        try {
            this.setState({
               nameofCoin: coin, 
            });
        } catch (error) {
            this.setState({ apiError: "Could not find any articles" });
          }
          this.setState({ loading: false });
    };

    render () {
        const {
            articles,
            apiError,
            nameofCoin,
          } = this.state;
        return (
            <div className="Crypto">
                <div className="container">
                <Header as="h4" style={{ textAlign: "center", margin: 20 }}>
                    {nameofCoin}
                </Header>
                <div id="block1">
                <div class="search-bar"><SearchBar addCoin={this.addCoin} /></div>
                {loading && (<p style={{ textAlign: "center" }}>Loading...</p> )}
                <h1 id='title'>Cryptocurrency Performance</h1>
                {apiError && <p>Could not fetch any articles. Please try again.</p>}
                </div>
                </div>
            </div>
        );
    }
}

export default eachCryptoPage;