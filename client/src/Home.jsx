import React, { useEffect } from 'react'
import Banner from './Banner';
import Header from './Header';
import requests from './Request';
import { useNavigate } from "react-router-dom"
import Row from './Row';

export default function Home({isLogin}) {
  const navigate= useNavigate()
 useEffect(()=>{
    if(!isLogin) return navigate('/')
 },[isLogin])
  return (
    <div className="App">
    <Header/>

    <Banner/>

    <Row 
      isLargeRow={true}
      title="NETFLIX ORIGIONALS"
      fetchURL={requests.fetchNetFlixOriginals}


    />

    <Row title = "Trending Now" fetchURL = {requests.fetchTreding}/>
    <Row title = "Top Rated" fetchURL = {requests.fetchTopRated}/>
    <Row title = "Action Movies" fetchURL = {requests.fetchActionMovies}/>
    <Row title = "Horror Movies" fetchURL = {requests.fetchHorroMovies}/>
    <Row title = "Romance Movies" fetchURL = {requests.fetchRomanticMovies}/>
    <Row title = "Documentaries" fetchURL = {requests.fetchDocumentaries}/>
     </div> 
  )
}
