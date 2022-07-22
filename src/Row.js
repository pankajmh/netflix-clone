import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
  //making some state
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  //A snippet of code which runs on specific condition
  useEffect(() => {
    //if [] empty run once when the row loads, and dont run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //   console.table(request.data.results);
      //   console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  //   console.log(movies);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  };

  const handleClick = movie => {
    //hide if video already shown
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || '')
        .then(url => {
          //url = https://www.youtube.com/watch?v=XtMThy8QKqU we need only ID so doing below
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v')); //here we are seeting the TrailerID, v=XtMThy8QKqU
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className='row'>
      {/* titles */}
      <h2>{title}</h2>
      {/* container -> poster inside */}
      <div className='row__posters'>
        {/* severals row__poster */}
        {movies.map(movie => (
          //"/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg" , base_url + movie.poster_path
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/**it will show trailer only when we have trailerUrl */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}{' '}
    </div>
  );
}

export default Row;
