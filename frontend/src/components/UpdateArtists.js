import React from 'react';
import axios from 'axios';
import "../index.css";

const UpdateArtists = ({setNoData, setArtists, setUpdateButton, upID, setUpID, upName, setUpName,upGenre, setUpGenre, upMaxListeners, setUpMaxListeners, upMinListeners, setUpMinListeners, upToName, setUpToName, upToGenre, setUpToGenre, upToListeners, setUpToListeners, setDeleteButton, setDeleteWarning}) => {


    const updateArtists = () => {
      //if user clicks update
        setNoData('No artists found');
        setDeleteButton(false);
        setDeleteWarning("");
        if(!upToGenre && !upToName && !upToListeners)
        { //if they made no changes say so
          setArtists([]);
            setNoData("you've set no changes");
        }
        else{
            axios.get('http://localhost:3000/artists/getArtists', {
                params: { id: upID, name: upName, genre: upGenre, min_listeners: upMinListeners, max_listeners: upMaxListeners }
              }) //fetch artists you wish to update
              .then(response => {
                console.log("Fetched Artists:", response.data);
                setArtists(response.data); // dispaly
                if(response.data&& response.data.length>0){
                  setUpdateButton(true); //set up a are you sure button
                }
            
              })
              .catch(error => {
                console.error('Error fetching artists:', error);
              });


        }
       
      };
      
      
      return( //update form
        <div>
             <h2>update Artist(s)</h2>
      <h3>parameters</h3>
      <label>ID: </label>
      <input type="number" value={upID} onChange={e => setUpID(e.target.value)} />
      <label>Name: </label>
      <input type="text" value={upName} onChange={e => setUpName(e.target.value)} />
      <label>Genre: </label>
      <input type="text" value={upGenre} onChange={e => setUpGenre(e.target.value)} />
      
      <label> Minimum Monthly Listeners: </label>
      <input type="number" value={upMinListeners} onChange={e => setUpMinListeners(e.target.value)} />

      <label> Maximum Monthly Listeners: </label>
      <input type="number" value={upMaxListeners} onChange={e => setUpMaxListeners(e.target.value)} />
      <h3>Update to:</h3>
      <label>Name: </label>
      <input type="text" value={upToName} onChange={e => setUpToName(e.target.value)} />
      <label>Genre: </label>
      <input type="text" value={upToGenre} onChange={e => setUpToGenre(e.target.value)} />
      <label> Monthly Listeners: </label>
      <input type="number" value={upToListeners} onChange={e => setUpToListeners(e.target.value)} />

      <button onClick={updateArtists}>Update</button>

        </div>

      );


};


export const updateArtistYes = (setArtists, upID, upName, upGenre, upMaxListeners, upMinListeners, upToName, upToGenre, upToListeners) => {
  //if user clicks yes for are you sure
    axios.get('http://localhost:3000/artists/updateArtists', {
      params: { id: upID,  upName, upGenre, min_listeners: upMinListeners, max_listeners: upMaxListeners, upToName, upToGenre, upToListeners } // Send filters as query parameters
    }) //update them
    .then(response => {
      console.log("Fetched Artists:", response.data);
  
      axios.get('http://localhost:3000/artists/getArtists', {
        params: { id: upID,  name: upToName, genre: upToGenre, min_listeners: upToListeners, max_listeners: upToListeners} // Send filters as query parameters
      }) //fetch updated artists
      .then(response => {
        console.log("Fetched Artists:", response.data);
        setArtists(response.data); // display
      }) 
    })
    .catch(error => {
      console.error('Error fetching artists:', error);
    });
  };

export default UpdateArtists;