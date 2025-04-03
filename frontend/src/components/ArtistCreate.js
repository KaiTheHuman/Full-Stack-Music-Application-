import React, { useState } from 'react';
import axios from 'axios'; //import stuff
import "../index.css";

const ArtistCreate = ({setNoData, setArtists, setUpdateButton, setDeleteButton, setDeleteWarning}) => {
      const [newName, setNewName] = useState(''); //variables for creating artists
      const [newGenre, setNewGenre] = useState('');
      const [listenerCount, setListenerCount] = useState('');

      const createArtists = () => { //when user presses create
        
        setUpdateButton(false);
        setDeleteButton(false);
        setDeleteWarning("");
        axios.get('http://localhost:3000/artists/createArtists', {
          params: { newName, newGenre, listener_count: listenerCount } // create Artists
        })
        .then(response => {
          if(response.data === "No name") //this was donw before i figured out how states work, hence why i never use this method again
          {
            setArtists([]);
            setNoData('New Artists must have a name');
          }
          else{
          axios.get('http://localhost:3000/artists/getArtists', {
            params: { id:response.data.insertId } // get created artist
          })
          .then(response => {
            console.log("Fetched Artists:", response.data);
            setArtists(response.data); // display new artist
          }) 
          }
        })
        .catch(error => {
          console.error('Error fetching artists:', error);
        });
        
      };
      return ( //form for creating artists
        <div>
    
    
          <h2>Create a new Artist</h2>
          <label>Name: </label>
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)} />
          <label>Genre: </label>
          <input type="text" value={newGenre} onChange={e => setNewGenre(e.target.value)} />
          
          <label>Monthly Listener Count: </label>
          <input type="number" value={listenerCount} onChange={e => setListenerCount(e.target.value)} />
    
          <button onClick={createArtists}>Create</button>
    
         
        </div>
    
        
      );
    };

export default ArtistCreate;