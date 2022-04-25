import React, {useEffect, useState} from "react";
import { Button, Form, Container, List, Header, Grid } from "semantic-ui-react";
import NFTobject from './NFTobject.js';
const { REACT_APP_GRAPHQL_URL } = process.env;

function NFT() {

  const [NFTs, setNFTs] = useState([]);
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")
  useEffect(() =>{
    getNFTs();
  }, [query]);

  const getNFTs = async () => {
    console.log(REACT_APP_GRAPHQL_URL);
    const response = await fetch(
      //`https://newsapi.org/v2/everything?q=${topic}&sortBy=recent&apiKey=${NEWS_API_KEY}`
      //`https://api.opensea.io/api/v1/assets?order_by=sale_dated&order_direction=desc&offset=0&limit=20`
      //`http://localhost:8000/graphql` process.env.REACT_APP_GRAPHQL_URL
      REACT_APP_GRAPHQL_URL, {method: 'POST',
      headers:{'content-type':'application/json'}, //{nftStats(filterSet:"{\\\"icontains\\\":{\\\"name\\\":\\\"${query}\\\"}}"){name, id, imageURL, description, price}}
      body:JSON.stringify({query:`{nftStats(filterSet:"{\\\"icontains\\\":{\\\"name\\\":\\\"${query}\\\"}}", limit: 20){name, id, imageURL, description, price}}`})
      });
    const json = await response.json();
    console.log(json);
    setNFTs(json.data.nftStats);
  };

  const handleSearch = event => {
    //console.log(event.target.value);
    setSearch(event.target.value);
    console.log(search)
  };

  const getSearch = event =>{
    event.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <Container>
      <Header as="h4" style={{ textAlign: "center", margin: 20 }}> Data Provided by OpenSea</Header>
      <div style={{ display: "flex", justifyContent: "center" }}>
      {/* <Form style={{ display: "flex", justifyContent: "center" }} className="search-form">
        <Form.Input className="search-bar" type="text"/>
        <Button className="search-button" type="submit" color="green">Search</Button>
      </Form> */}
      <Form onSubmit={getSearch}>
          <Form.Group>
            <Form.Input
              placeholder="Search NFT"
              name="topic"
              value={search}
              onChange={handleSearch}
            />
            <Button type="submit" color="green">
              Search
            </Button>
          </Form.Group>
        </Form>
      </div>
      <Grid>
        <Grid.Row divided columns={2}>
          <Grid.Column>
          <List divided style={{ maxWidth: "0 auto", margin: 30 }}>
            {NFTs.slice(0,4).map(NFTs =>(
              <NFTobject key ={NFTs.name} title={NFTs.name} price={NFTs.price} desc ={NFTs.description}
              image={NFTs.imageURL}/>
            ))}
          </List>
          </Grid.Column>
          <Grid.Column>
          <List divided style={{ maxWidth: "0 auto", margin: 30 }}>
            {NFTs.slice(4,9).map(NFTs =>(
              <NFTobject key ={NFTs.name} title={NFTs.name} price={NFTs.price} desc ={NFTs.description}
              image={NFTs.imageURL}/>
            ))}
          </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default NFT;