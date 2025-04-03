import React, { useState } from 'react';
import axios from 'axios';  //import react and axios
import "../index.css";

const AlbumSearch = ({setNoData, setAlbums, setUpdateButton, setDeleteButton, setDeleteWarning}) => {
  const [id, setId] = useState([]);  //set up varibles were searching for
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [minListeners, setMinListeners] = useState('');
  const [maxListeners, setMaxListeners] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  
  const getAlbums = () => { //if user clicks on search
    setNoData('No albums found'); //turn off any buttons
    setUpdateButton(false);
    setDeleteButton(false);
    setDeleteWarning(false);
    //search for albums using parameters
    axios.get('http://localhost:3000/albums/getAlbums', {
      params: { id,name, artist, min_listeners: minListeners, max_listeners: maxListeners, min_Year: minYear, max_Year: maxYear, artistID: null } // Send filters as query parameters
    })
    .then(response => {
      console.log("Fetched Albums:", response.data);
      setAlbums(response.data); // display information
    })
    .catch(error => {
      console.error('Error fetching Albums:', error);
    });
  };

 const getAllAlbums =() =>{ //if user presses on get All Albums button (same as if they pressed search with no parameters)
  setNoData('No albums found');//turn off any buttons
  setUpdateButton(false);
  setDeleteButton(false);
  setDeleteWarning(false);
  axios.get('http://localhost:3000/albums/getAllAlbums', {
    params: {  } // Search with no parameters
  })
  .then(response => {
    console.log("Fetched Albums:", response.data);
    setAlbums(response.data); // Display info
  })
  .catch(error => {
    console.error('Error fetching Albums:', error);
  });
 };

  return ( //search form
    <div>
      <h2>Search Albums</h2>
      <label>ID: </label>
      <input type="number" value={id} onChange={e => setId(e.target.value)} />
      <label>Name: </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <label>Artist: </label>
      <input type="text" value={artist} onChange={e => setArtist(e.target.value)} />
      
      <label> Minimum Number of Listens: </label>
      <input type="number" value={minListeners} onChange={e => setMinListeners(e.target.value)} />

      <label> Maximum Number of Listens: </label>
      <input type="number" value={maxListeners} onChange={e => setMaxListeners(e.target.value)} />

      <label> From Year: </label>
      <input type="number" value={minYear} onChange={e => setMinYear(e.target.value)} />

      <label> To Year: </label>
      <input type="number" value={maxYear} onChange={e => setMaxYear(e.target.value)} />

      <button onClick={getAlbums}>Search</button>
      <button onClick={getAllAlbums}>Get All Albums</button>
    </div>

    
  );
};

export default AlbumSearch;