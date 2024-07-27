import React, { Component } from "react";
import axios from "axios";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      query: "keyword",
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${this.state.query}&apiKey=c9521e3c3ee74a62b28d5f9c1a0edd5d`
      );
      const articles = response.data.articles        
      this.setState({ articles: articles, loading: false });
    } catch (error) {
      console.error("Error fetching the news articles", error);
    }
  };

  handleSearch = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchNews();
  };
  render() {
    return (
      <div>
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-10">News App</h1>
          <form onSubmit={this.handleSubmit} className="mb-4">
            <div className="flex gap-2 justify-center">
              <input
                type="text"
                value={this.state.query}
                onChange={this.handleSearch}
                className="border p-2 mr-2 w-1/3 rounded"
                placeholder="Search for news..."
              />
              <button type="submit" className="bg-blue-500 text-white p-2">
                Search
              </button>
            </div>
          </form>
        </header>
        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {this.state.articles.map((article, index) => (
              <div
                key={index}
                className="card flex flex-col justify-between border border-white w-1/3 p-4 rounded shadow"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="mb-2"
                  />
                )}
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <p>{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
