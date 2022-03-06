import React from 'react';
import './App.css';
import requests from './request';
import Row from './row';
import Banner from "./Banner";
import Nav from './nav';

function App() {
  return (
    <div className="App">
    <Nav />
    <Banner 
      fetchUrl={requests.fetchNetflixOriginals}
    />
     <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row
        title="Trending"
        fetchUrl={requests.fetchTrending}
      />
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
      />
      <Row
        title="Action"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comedy"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        title="Horror"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
      />
      <Row
        title="Romance"
        fetchUrl={requests.fetchRomanceMovies}
      />
    </div>
  );
}

export default App;
