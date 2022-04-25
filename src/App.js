import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, StockScreener, News, Intrinsic, NFT, CryptoPages, Crypto} from "./components";


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/StockScreener" exact component={() => <StockScreener />} />
          <Route path="/Intrinsic" exact component={() => <Intrinsic />} />
          <Route path="/News" exact component={() => <News />} />
          <Route path="/Crypto" exact component={() => <Crypto />} />
          <Route path="/Crypto/:symbol" component={CryptoPages}/>
          <Route path="/NFT" exact component={() => <NFT />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
export default App;