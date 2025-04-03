import React, { useState } from 'react';
import axios from 'axios';
import "../index.css";

const SongSearch = ({setNoData, setSongs, setUpdateButton, setDeleteButton, setDeleteWarning}) => {
   const [id, setId] = useState([]); //variables for searching songs
  const [name, setName] = useState('');
  const [album, setAlbum] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  const getSongs = () => { //if user clicks search
    setNoData('No albums found');
    setUpdateButton(false);
    setDeleteButton(false);
    setDeleteWarning(false);
    axios.get('http://localhost:3000/songs/getSongs', {
      params: {id, name, album, min_Year: minYear, max_Year: maxYear, albumID:null } 
    }) //search songs
    .then(response => {
      console.log("Fetched Songs:", response.data);
      setSongs(response.data); //display data
    })
    .catch(error => {
      console.error('Error fetching Songs:', error);
    });
  };

 const getAllSongs =() =>{ //if user clicks search all (same as having no parameters)
  setNoData('No albums found');
  setUpdateButton(false);
  setDeleteButton(false);
  setDeleteWarning(false);
  axios.get('http://localhost:3000/songs/getAllSongs', {
    params: { } 
  })
  .then(response => {
    console.log("Fetched Songs:", response.data);
    setSongs(response.data); // display data
  })
  .catch(error => {
    console.error('Error fetching Songs:', error);
  });
 };

  return ( //form for searching songs
    <div>
      <h2>Search Songs</h2>
      <label> ID: </label>
      <input type="number" value={id} onChange={e => setId(e.target.value)} />
      <label>Name: </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <label>Album: </label>
      <input type="text" value={album} onChange={e => setAlbum(e.target.value)} />

      <label> From Year: </label>
      <input type="number" value={minYear} onChange={e => setMinYear(e.target.value)} />

      <label> To Year: </label>
      <input type="number" value={maxYear} onChange={e => setMaxYear(e.target.value)} />

      <button onClick={getSongs}>Search</button>
      <button onClick={getAllSongs}>Get All Songs</button>

    </div>

    
  );
};

export default SongSearch;