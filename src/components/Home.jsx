import React, { useState } from "react";
import logo from '../images/MarketVisionLogo.JPG'
import gray from '../images/gray3.png'
import { IntlProvider, FormattedMessage } from "react-intl";
import Carousel from 'react-bootstrap/Carousel'

const messages = {
  en: {
    stockTitle: "Stock Screener",
    stockDesc: "Stock Description",
    intrinsicTitle: "Intrinsic Screener",
    intrinsicDesc: "Intrinsic Description",
    newsTitle: "News Screener",
    newsDesc: "News Description",
    cryptoTitle: "Crypto Screener",
    cryptoDesc: "Crypto Description",
    NFTTitle: "NFT Screener",
    NFTDesc: "NFT Description",
    homeTitle: "Home Page",
    welcome: "Welcome to MarketVision! Here you can find all the information you need to make the right investment decisions!"
  },
  es: {
    stockTitle: "Stock Screener in Spanish",
    stockDesc: "Stock Description in Spanish",
    intrinsicTitle: "Intrinsic Screener in Spanish",
    intrinsicDesc: "Intrinsic Description in Spanish",
    newsTitle: "News Screener in Spanish",
    newsDesc: "News Description in Spanish",
    cryptoTitle: "Crypto Screener in Spanish",
    cryptoDesc: "Crypto Description in Spanish",
    NFTTitle: "NFT Screener in Spanish",
    NFTDesc: "NFT Description in Spanish",
    homeTitle: "Pagina de inicio in Spanish",
    welcome: "¡Bienvenido a MarketVision! ¡Aquí puede encontrar toda la información que necesita para tomar las decisiones de inversión correctas!"
  }
};



function Home() {
  const [local, setLocal] = useState("en");

  return (
    <div class="jumbotron">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src={logo}
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <select onChange={(e) => setLocal(e.target.value)} defaultValue={local}>
              {["en","es"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <IntlProvider local={local} messages={messages[local]}>
              <h1 class="font-weight-light">
                <FormattedMessage 
                id="homeTitle" 
                defaultMessage="Default" 
                value={{local}}>
                </FormattedMessage>
                </h1>
            </IntlProvider>
            <IntlProvider local={local} messages={messages[local]}>
              <p>
                <FormattedMessage 
                id="welcome" 
                defaultMessage="Default" 
                value={{local}}>
                </FormattedMessage>
              </p>
            </IntlProvider>
          </div>
        </div>
        <div>
          <Carousel>
            <Carousel.Item>
              <Carousel.Caption style={{top: "0", bottom: "auto"}}>
                <IntlProvider local={local} messages={messages[local]}>
                  <h3>
                  <FormattedMessage 
                  id="stockTitle" 
                  defaultMessage="Default" 
                  value={{local}}>
                  </FormattedMessage>
                  </h3>
                </IntlProvider>
                <IntlProvider local={local} messages={messages[local]}>
                  <p>
                  <FormattedMessage 
                  id="stockDesc" 
                  defaultMessage="Default" 
                  value={{local}}>
                  </FormattedMessage>
                  </p>
                </IntlProvider>
              </Carousel.Caption>
              <img
                className="w-100"
                src={gray}
                alt="First slide"
              />
            </Carousel.Item>
           
            <Carousel.Item>
              <Carousel.Caption style={{top: "0", bottom: "auto"}}>
                <IntlProvider local={local} messages={messages[local]}>
                  <h3>
                  <FormattedMessage 
                  id="intrinsicTitle" 
                  defaultMessage="Default" 
                  value={{local}}>
                  </FormattedMessage>
                  </h3>
                </IntlProvider>
                <IntlProvider local={local} messages={messages[local]}>
                  <p>
                  <FormattedMessage 
                  id="intrinsicDesc" 
                  defaultMessage="Default" 
                  value={{local}}>
                  </FormattedMessage>
                  </p>
                </IntlProvider>
              </Carousel.Caption>
              <img
                className="w-100"
                src={gray}
                alt="First slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <Carousel.Caption style={{top: "0", bottom: "auto"}}>
                <IntlProvider local={local} messages={messages[local]}>
                  <h3>
                  <FormattedMessage 
                  id="newsTitle" 
                  defaultMessage="Default" 
                  value={{local}}>
                  </FormattedMessage>
                  </h3>
                </IntlProvider>
                <IntlProvider local={local} messages={messages[local]}>
                  <p>
                  <FormattedMessage 
                  id="newsDesc" 
                  defaultMessage="Default" 
                  value={{local}}>
                  </FormattedMessage>
                  </p>
                </IntlProvider>
              </Carousel.Caption>
              <img
                className="w-100"
                src={gray}
                alt="First slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <Carousel.Caption style={{top: "0", bottom: "auto"}}>
                <IntlProvider local={local} messages={messages[local]}>
                  <h3>
                  <FormattedMessage 
                  id="cryptoTitle" 
                  defaultMessage="Default" 
                  value={{local}}>
                  </FormattedMessage>
                  </h3>
                </IntlProvider>
                <IntlProvider local={local} messages={messages[local]}>
                  <p>
                  <FormattedMessage 
                  id="cryptoDesc" 
                  defaultMessage="Default" 
                  value={{local}}>
                  </FormattedMessage>
                  </p>
                </IntlProvider>
              </Carousel.Caption>
              <img
                className="w-100"
                src={gray}
                alt="First slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <Carousel.Caption style={{top: "0", bottom: "auto"}}>
                <IntlProvider local={local} messages={messages[local]}>
                  <h3>
                  <FormattedMessage 
                  id="NFTTitle" 
                  defaultMessage="Default" 
                  value={{local}}>
                  </FormattedMessage>
                  </h3>
                </IntlProvider>
                <IntlProvider local={local} messages={messages[local]}>
                  <p>
                  <FormattedMessage 
                  id="NFTDesc" 
                  defaultMessage="Default" 
                  value={{local}}>
                  </FormattedMessage>
                  </p>
                </IntlProvider>
              </Carousel.Caption>
              <img
                className="w-100"
                src={gray}
                alt="First slide"
              />
            </Carousel.Item>
            
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Home;