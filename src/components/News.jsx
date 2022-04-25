import React from "react";
import { getArticles } from "./getNews";
import { Container, Header, Table } from "semantic-ui-react";
import ArticleList from './ArticleList.js';
import SearchBar from "./newsSearch.js";



class News extends React.Component {
  state = {
    articles: [],
    searchTopic: "",
    totalResults: "",
    loading: false,
    apiError: "",
  };

searchForTopic = async (topic, lang) => {
  try {
    this.setState({ loading: true });
    const response = await getArticles(topic, lang);
    this.setState({
      articles: response.results,
      searchTopic: topic,
      language: lang,
      totalResults: response.count,
    });
  } catch (error) {
    this.setState({ apiError: "Could not find any articles" });
  }
  this.setState({ loading: false });
};

  render() {
    const {
      articles,
      apiError,
      loading,
      searchTopic,
      totalResults,
    } = this.state;
    return (
      <Container>
        <Header as="h2" style={{ textAlign: "center", margin: 20 }}></Header>
        <SearchBar searchForTopic={this.searchForTopic} language={this.language}/>
        {loading && (
          <p style={{ textAlign: "center" }}>Searching for articles...</p>
        )}
        {articles.length > 0 && (
          <Header as="h4" style={{ textAlign: "center", margin: 20 }}>
            Found {totalResults} articles on "{searchTopic}"
          </Header>
        )}
        {articles.length > 0 && <ArticleList articles={articles} />}
        {apiError && <p>Could not fetch any articles. Please try again.</p>}
      </Container>
    );
  }
}

export default News;