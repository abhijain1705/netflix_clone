import React, { useEffect, useState } from 'react';
import axios from "./axios";
import requests from './request';
import "./Banner.css";
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";

function Banner({ fetchUrl }) {

    const [movie, setMovie] = useState([]);

    //this is for trailer playing in code.
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length)]);
            return request;
        };

        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '450',
        width: '100%',
        playerVars: {
            //"https://developers.google.com/youtube/player_parameters"
            autoplay: 1,
        },
    }

    function handleClick(movie) {
        if (trailerUrl) {
            setTrailerUrl("")
        } else {
            movieTrailer(movie.name || movie.title || movie.original_title || "")
                .then((url) => {
                    if (url == null) {
                        window.location.reload();
                    } else {
                        const UrlParams = new URL(url);
                        const videoId = UrlParams.search.slice(3, 15);
                        setTrailerUrl(videoId);
                        console.log(trailerUrl);
                    }
                })
                .catch((error) => console.log(error));
        }
    }

    function truncateString(str, num) {
        return str?.length > num ? str.substring(0, num - 1) + "..." : str;
    }
    return (
        <header className='banner' style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center  center"
        }}>
            {trailerUrl ? <YouTube videoId={trailerUrl} opts={opts} /> :
                <div>
                    <div className='banner_contents'>
                        <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>

                        <div className='banner_buttons'>
                            <button onClick={() => handleClick(movie)} className='banner_button'>Play</button>
                            <button className='banner_button'>My list</button>

                            <h1 className='banner_description'>{truncateString(movie?.overview, 150)}</h1>
                        </div>
                    </div>
                    <div className='banner-fadeBottom'></div>
                </div>}
        </header>
    )
}

export default Banner