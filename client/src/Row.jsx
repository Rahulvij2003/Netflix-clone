import React, { useEffect, useState } from 'react'
import './Row.css'
import axios from './Axios'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const baseURL = "https://image.tmdb.org/t/p/original"

function Row({title, fetchURL, isLargeRow}) {

    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(() => {
      async function fetchData(){
        await axios.get(fetchURL).then((res)=>{
          setMovies(res.data.results)
        console.log(res.data.results)
        }).catch((error)=> console.log(error.message))
      } 
      fetchData();
    }, [fetchURL]);


    const opts = {
      height: "500",
      width: "700",
      playerVars: {
          autoplay: 1,
      }
  }

  const handleClick = (movie) => {
    console.log(movie)
      if(trailerUrl){
          setTrailerUrl("");
      } else {
          movieTrailer(movie?.name || "")
          .then((url) => {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get('v'));
          })
          .catch(() => console.log('Temporary Unavailable'))
      }
  }

  return (
    <div className='row'>
        {title}
        <div className='row-posters'>
            
              <div className='row-posters'>
              {movies && movies.map((movie) => (
                <img 
                  key={movie.id}
                  onClick = {() => handleClick(movie)}
                  className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                  src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.name} 
                />
              ))}
            </div>
            
          



        </div>

        {trailerUrl && <YouTube className='video' videoId = {trailerUrl} opts = {opts}/> }  
        

      
    </div>
  )
}

export default Row
