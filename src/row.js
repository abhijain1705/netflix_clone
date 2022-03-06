import React, { useEffect, useState } from 'react';
import axios from "./axios";
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";
import "./row.css";

const base_url = 'https://image.tmdb.org/t/p/original';

function Row({ title, fetchUrl, isLargeRow }) {

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    // run once and then stopped.
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
    //"https://developers.google.com/youtube/player_parameters"
      autoplay: 1,
    },
  }

  const handleClick =(movie) => {
       if (trailerUrl) {
         setTrailerUrl("")
       }else {
        movieTrailer(movie?.name || movie?.title || movie?.original_title || "")
          .then((url) => {
           const UrlParams = new URL(url);
           const param = new URLSearchParams(UrlParams.search);
           setTrailerUrl(param.get('v'))
          })
          .catch((error) => console.log(error));
      }
  }

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
           onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_poster_large"}`} 
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row;