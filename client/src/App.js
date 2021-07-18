import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import axios from 'axios';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [films, setFilms] = useState([]);

  const getMovieApi = () => {
    const url = "https://www.omdbapi.com/?s=Jaws&apikey=a9fe69df";
    axios.get(url)
    .then((res) => {
      console.log(res)
      setFilms(res.data.Search[0].Poster)
    })
  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <button onClick={getMovieApi}>Get movie</button>
          <img src={films}></img>
          <Switch>
            {/* <Route exact path='/' component={Landing} />
            <Route exact path='/saved' component={Favorites} /> */}
            {/* <Route render={() => <h1 className='display-2'>Wrong page!</h1>} /> */}
          </Switch>
        </>
        </Router>
    </ApolloProvider>
  );
}

export default App;
