import React from 'react';
import { Button, Form, Icon} from "semantic-ui-react";
import './Crypto.css';
import { Link } from 'react-router-dom';
const cryptocurrencies = require('cryptocurrencies');

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      name: "",
      items: [],
    };
  }

  componentDidMount() {
    this.setState({items: cryptocurrencies.symbols().map(a => a)});
  }

  onTextChange = (event) => {
    const value = event.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = this.state.items.sort().filter(v => regex.test(v)).slice(0, 5);
    }
    this.setState(() => ({ suggestions, name: value }));
  }

  suggestionSelected(value) {
    this.setState(() => ({
      name: value,
      suggestions: [],
    }))
  }

  renderSuggestions () {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div class="suggestions">
        <ul> 
            {suggestions.map((item) => <li id="suggest" onClick={() => this.suggestionSelected(item)} > {item} </li>)}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div style={{ marginBottom: "0px", marginTop: "10px", float: "right" }}>
        <Form>
          <Form.Group>
            <Form.Input
              placeholder="Search crypto symbol"
              name="coin"
              value={this.state.name}
              onChange={this.onTextChange}
              type ="text"
            />
          <Link to={{
            pathname: "/Crypto/" + this.state.name,
            symbol: this.state.name
           }}>
            <Button animated type="submit" color="grey">
              <Button.Content visible>Search</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
            </Link>
          </Form.Group>
          {this.renderSuggestions()}
        </Form>
      </div>
    );
  }
}

export default SearchBar;