import React from "react";
import { Button, Form, Table } from "semantic-ui-react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTopic: "", language: "en" };
  }

  handleChange = event => {
    this.setState({ searchTopic: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.searchForTopic(this.state.searchTopic, this.state.language);
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <Table>
          <Table.Body>
            <Table.Row>
            <td>Language</td>
                <td>
                  <select
                    value={this.state.language}
                    onChange={(e) => this.setState({language: e.target.value})}
                  >
                    <option value="ar">Arabic</option>
                    <option value="de">German</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="he">Hebrew</option>
                    <option value="it">Italian</option>
                    <option value="nl">Dutch</option>
                    <option value="no">Norwegian</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="se">Swedish</option>
                    <option value="zh">Chinese</option>
                  </select>
                </td>
            </Table.Row>
          </Table.Body>
        </Table> */}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Search Stock Ticker"
              name="topic"
              value={this.state.searchTopic}
              onChange={this.handleChange}
            />
            <Button type="submit" color="green">
              Search
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SearchBar;