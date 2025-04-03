import React from 'react';
import axios from 'axios';
import "../index.css";

const DeleteArtists = ({setNoData, setArtists, setDeleteButton, deleteID, setDeleteID, delName, setDelName, delGenre, setDelGenre, delMinListeners, setDelMinListeners, delMaxListeners, setDelMaxListeners, setUpdateButton, setDeleteWarning}) => {

    const deleteArtists = () => { //if user clicks deleate
        setNoData('No artists found');
        setUpdateButton(false);
        if(!deleteID && !delName && !delGenre && !delMinListeners && !delMaxListeners)
        { //if no parameters set warn user that doing so will delete everything
          setDeleteWarning("You have selected All, are you sure you want to delete whole Artist database");
        }
        axios.get('http://localhost:3000/artists/getArtists', { //fetch artists to be deleted
          params: { id: deleteID, name: delName, genre: delGenre, min_listeners: delMinListeners, max_listeners: delMaxListeners } // Send filters as query parameters
        })
        .then(response => {
          console.log("Fetched Artists:", response.data);
          setArtists(response.data); // display artists to be deleted
          if(response.data&& response.data.length>0){
            setDeleteButton(true);
          }
      
        })
        .catch(error => {
          console.error('Error fetching artists:', error);
        });
      };

      return( //form for deleting artists
        <div>
            <h2>Delete Artist(s)</h2>
      <label>ID: </label>
      <input type="number" value={deleteID} onChange={e => setDeleteID(e.target.value)} />
      <label>Name: </label>
      <input type="text" value={delName} onChange={e => setDelName(e.target.value)} />
      <label>Genre: </label>
      <input type="text" value={delGenre} onChange={e => setDelGenre(e.target.value)} />
      
      <label> Minimum Monthly Listeners: </label>
      <input type="number" value={delMinListeners} onChange={e => setDelMinListeners(e.target.value)} />

      <label> Maximum Monthly Listeners: </label>
      <input type="number" value={delMaxListeners} onChange={e => setDelMaxListeners(e.target.value)} />

      <button onClick={deleteArtists}>Delete</button>

        </div>
      )
      
      

}


export const deleteArtistYes = (setArtists, deleteID, delName, delGenre, delMinListeners, delMaxListeners) => {
  //if user clicks yes they want to delete
    axios.get('http://localhost:3000/artists/deleteArtists', {
        //delete artists
      params: { id: deleteID,  delName,  delGenre, min_listeners: delMinListeners, max_listeners: delMaxListeners } // Send filters as query parameters
    })
    .then(response => {
      console.log("Fetched Artists:", response.data);
      setArtists(response.data); //this should be blank
    })
    .catch(error => {
      console.error('Error fetching artists:', error);
    });
  };

export default DeleteArtists;