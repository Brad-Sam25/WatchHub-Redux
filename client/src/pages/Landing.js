import React, { Component, useState } from "react"
import {Tile} from 'react-bulma-components';
import {Box} from 'react-bulma-components';
import {Section} from 'react-bulma-components';
import API from '../../utils/API'

class Landing extends Component{
    state = {
      result: {},
      search: ""
    };
  
    // When this component mounts, search for the movie "The Matrix"
    componentDidMount() {
      this.searchMovies("The Matrix");
    }
  
    searchMovies = query => {
      API.search(query)
        .then(res => this.setState({ result: res.data }))
        .catch(err => console.log(err));
    };
  
    handleInputChange = event => {
      const value = event.target.value;
      const name = event.target.name;
      this.setState({
        [name]: value
      });
    };
  
    // When the form is submitted, search the OMDB API for the value of `this.state.search`
    handleFormSubmit = event => {
      event.preventDefault();
      this.searchMovies(this.state.search);
    };
    render() {
      return (
        <div>
          <Section>
            <Box id="box">
              <Tile kind="ancestor">
                <Tile size={8} vertical>
                  <Tile>
                    <Tile kind="parent" vertical>
                      <Tile
                        renderAs="article"
                        kind="child"
                        notification
                        color="primary"
                        id="querybox"
                      >
                        <div class="columns is-centered">
                          <div class="column is-8">
                            <label class="label">Title Search</label>
                            <div class="control">
                              <input
                                id="userQuery"
                                class="input"
                                type="text"
                                placeholder="Search for your title here!"
                                list="searchinfo"
                                value={this.state.search}
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                              />
                            </div>
                            <br />
                            <button id="searchBtn" class="button">
                              Search
                            </button>
                            <datalist id="searchinfo"></datalist>
                          </div>
                        </div>
                      </Tile>
                      <Tile
                        renderAs="article"
                        kind="child"
                        notification
                        color="is-link"
                        id="related"
                      >
                        <p class="title">Related Searches</p>
                        <p class="subtitle">Titles related to your search</p>
                        <div class="columns">
                          <div id="relatedsearch" class="column"></div>
                          <div id="relatedsearch2" class="column"></div>
                          <div id="relatedsearch3" class="column"></div>
                        </div>
                      </Tile>
                    </Tile>
                    <Tile kind="parent">
                      <Tile renderAs="article"
                        kind="child"
                        notification
                        color="info"
                        id="poster">
                        <article class="tile is-child notification is-link">
                          <figure id="result" class="image is-10by13"></figure>
                        </article>
                      </Tile>
                    </Tile>
                  </Tile>
                  <Tile kind="parent">
                    <Tile renderAs="article" kind="child" notification color="danger" id="streaming">
                      <div id="streaming-section" class="content is-centered">
                        <nav class="columns is-centered is-vcentered">
                          <div class="level-item has-text-centered">
                            <div class="column">
                              <p class="heading">Critic Score</p>
                              <p class="title" id="critic-score"></p>
                            </div>
                          </div>
                          <div class="level-item has-text-centered">
                            <div class="column">
                              <p class="heading">Ratings</p>
                              <p class="title" id="rating"></p>
                            </div>
                          </div>
                          <div class="level-item has-text-centered">
                            <div class="column">
                              <p class="heading">Runtime</p>
                              <p class="title" id="run-time"></p>
                            </div>
                          </div>
                          <div class="level-item has-text-centered">
                            <div class="column is-vcentered">
                              <p class="heading">Release Date</p>
                              <p class="title" id="release-date"></p>
                            </div>
                          </div>
                        </nav>
                      </div>
                      <div className="content" />
                    </Tile>
                  </Tile>
                </Tile>
                <Tile kind="parent">
                  <Tile renderAs="article" kind="child" notification color="success" id="stats">
                    <div className="content">
                    <article class="tile is-child notification is-link">
                        <div class="content">
                          <h1 id="movietitle" class="title has-text-white"></h1>
                          <h4 id="titleyear"></h4>
                          <h4 id="actors" class="is-family-monospace"></h4>
                          <p
                            id="description"
                            class="subtitle has-text-weight-semibold"
                          ></p>
                          <div id="trailerBox">
                          
                          </div>
                          <div class="content">
                          </div>
                        </div>
                      </article>
                      <div className="content" />
                    </div>
                  </Tile>
                </Tile>
              </Tile>
            </Box>
          </Section>
        </div>
      )}
    }

export default Landing;
