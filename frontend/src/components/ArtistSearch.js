import React, { useState } from 'react';
import axios from 'axios';
import "../index.css";

const ArtistSearch = ({setNoData, setArtists, setUpdateButton, setDeleteButton, setDeleteWarning}) => {
  const [searchID, setID] = useState(''); //set up variables for search
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [minListeners, setMinListeners] = useState('');
  const [maxListeners, setMaxListeners] = useState('');


  const fetchArtists = () => { //if user clicks search
    setNoData('No artists found');
    setUpdateButton(false);
    setDeleteButton(false);
    setDeleteWarning("");
    axios.get('http://localhost:3000/artists/getArtists', { //search artitsts
      params: { id: searchID, name, genre, min_listeners: minListeners, max_listeners: maxListeners } 
    })
    .then(response => {
      console.log("Fetched Artists:", response.data);
      setArtists(response.data); // display fetched artists
    })
    .catch(error => {
      console.error('Error fetching artists:', error);
    });
  };

 

 const getAllArtists =() =>{ //if user clicks search all (same as if they searched with no parameters)
  setNoData('No artists found');
  setUpdateButton(false);
  setDeleteButton(false);
  axios.get('http://localhost:3000/artists/getAllArtists', {
    params: { } //search
  })
  .then(response => {
    console.log("Fetched Artists:", response.data);
    setArtists(response.data); //display
  })
  .catch(error => {
    console.error('Error fetching artists:', error);
  });
 };

 

  return ( //form for searching
    <div>
      <h2>Search Artists</h2>
      <label>ID: </label>
      <input type="number" value={searchID} onChange={e => setID(e.target.value)} />
      <label>Name: </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <label>Genre: </label>
      <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />
      
      <label> Minimum Monthly Listeners: </label>
      <input type="number" value={minListeners} onChange={e => setMinListeners(e.target.value)} />

      <label> Maximum Monthly Listeners: </label>
      <input type="number" value={maxListeners} onChange={e => setMaxListeners(e.target.value)} />

      <button onClick={fetchArtists}>Search</button>
      <button onClick={getAllArtists}>Get All Artists</button>
      

     


  
    
    </div>

    
  );
};

export default ArtistSearch;