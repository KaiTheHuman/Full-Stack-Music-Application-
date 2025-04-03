import React from 'react';
import axios from 'axios';
import "../index.css";

const AlbumDelete = ({setNoData, setAlbums, setDeleteButton, deleteID, setDeleteID, delName, setDelName, delArtist, setDelArtist, delMinListeners, setDelMinListeners, delMaxListeners, setDelMaxListeners, delMinYear, setDelMinYear, delMaxYear, setDelMaxYear, setUpdateButton, setDeleteWarning, delArtistID, setDelArtistID}) => {

    const deleteAlbums = () => { //when user presses delete Album button
        setNoData('No artists found');
        setUpdateButton(false); //if update button was there, get rid of it
         if(delArtistID){ //if given the artists ID for the Albums you want to delete
          axios.get('http://localhost:3000/artists/getArtists', { //fetch artists data
            params: { id: delArtistID, name: null, genre: null, min_listeners: null, max_listeners: null} 
          })
            .then(artistResponse =>{ //if artist doesnt exist
              if(!artistResponse || artistResponse.data.length ===0){
                setAlbums([]);
                setNoData("Artist is not in database"); //tell user it doesnt exist
              }
              else{ //if user does exist, see if user hasnt put in any inputs, implying they want to delete whole database
                if(!deleteID && !delName && !delArtist && !delArtistID && !delMinListeners && !delMaxListeners && !delMaxYear && !delMinYear)
                  { //inform user using warning
                    setDeleteWarning("You have selected All, are you sure you want to delete whole Album database");
                  }
                  //fetch info of albums about to be deleted
                  axios.get('http://localhost:3000/albums/getAlbums', {
                    params: { id: deleteID, name: delName, artist: delArtist, min_listeners: delMinListeners, max_listeners: delMaxListeners, min_year: delMinYear, max_year: delMaxYear, artistID:delArtistID } // Send filters as query parameters
                  })
                  .then(response => {
                    console.log("Fetched Albums:", response.data);
                    setAlbums(response.data); // display to be deleted Albums
                    if(response.data&& response.data.length>0){
                      setDeleteButton(true); //activate delete are you sure button
                    }
                
                  })

              }
            
            } )}
          else if(delArtist){ //if given artists name instead of ID
          axios.get('http://localhost:3000/artists/getArtists', { //fetch artists info
            params: { id: null, name: delArtist, genre: null, min_listeners: null, max_listeners: null} 
          })
            .then(artistResponse =>{
              if(!artistResponse || artistResponse.data.length ===0){ //if artist doesnt exist say so
                setAlbums([]);
                setNoData(" Artist is not in database");
              }
              else if(artistResponse.data.length >1){ //if multiple artists say so
                setAlbums([]);
                setNoData("There are multiple Artists with that name, assign by ID instead");
              }
              else{ //if artist exists, get its ID.
                setDelArtistID(artistResponse.data[0].id) 
                if(!deleteID && !delName && !delArtist && !delArtistID && !delMinListeners && !delMaxListeners && !delMaxYear && !delMinYear)
                  {
                    //if no parameters, warn user this will cause all Albums to be deleted
                    setDeleteWarning("You have selected All, are you sure you want to delete whole Album database");
                  }
                  //get to be deleted Albums are display them
                  axios.get('http://localhost:3000/albums/getAlbums', {
                    params: { id: deleteID, name: delName, artist: delArtist, min_listeners: delMinListeners, max_listeners: delMaxListeners, min_year: delMinYear, max_year: delMaxYear, artistID:delArtistID } // Send filters as query parameters
                  })
                  .then(response => {
                    console.log("Fetched Albums:", response.data);
                    setAlbums(response.data); //display to be deletd Albums
                    if(response.data&& response.data.length>0){
                      setDeleteButton(true); //activate are you sure button
                    }
                  })
              }
            } )
        }
        else { //IF no artist mentioned
         if(!deleteID && !delName && !delArtist && !delArtistID && !delMinListeners && !delMaxListeners && !delMaxYear && !delMinYear)
        {
          //warn user that no parameters means all Albums will be deleted
          setDeleteWarning("You have selected All, are you sure you want to delete whole Album database");
        } //fetch to be delted Albums
        axios.get('http://localhost:3000/albums/getAlbums', {
          params: { id: deleteID, name: delName, artist: delArtist, min_listeners: delMinListeners, max_listeners: delMaxListeners, min_year: delMinYear, max_year: delMaxYear, artistID:delArtistID } // Send filters as query parameters
        })
        .then(response => {
          console.log("Fetched Albums:", response.data);
          setAlbums(response.data); // display to be deleted Albums
          if(response.data&& response.data.length>0){
            setDeleteButton(true);
          }
      
        })
        .catch(error => {
          console.error('Error fetching albums:', error);
        });
      };
    }

      return( //input form to delete Albums
        <div>
            <h2>Delete Album(s)</h2>
      <label>ID: </label>
      <input type="number" value={deleteID} onChange={e => setDeleteID(e.target.value)} />
      <label>Name: </label>
      <input type="text" value={delName} onChange={e => setDelName(e.target.value)} />
      <label>Artist: </label>
      <input type="text" value={delArtist} onChange={e => setDelArtist(e.target.value)} />
      <label>Artist ID: </label>
      <input type="number" value={delArtistID} onChange={e => setDelArtistID(e.target.value)} />
      
      <label> Minimum Number of Listeners: </label>
      <input type="number" value={delMinListeners} onChange={e => setDelMinListeners(e.target.value)} />

      <label> Maximum Number of Listeners: </label>
      <input type="number" value={delMaxListeners} onChange={e => setDelMaxListeners(e.target.value)} />
      <label> From Year: </label>
      <input type="number" value={delMinYear} onChange={e => setDelMinYear(e.target.value)} />

      <label> To Year: </label>
      <input type="number" value={delMaxYear} onChange={e => setDelMaxYear(e.target.value)} />

      <button onClick={deleteAlbums}>Delete</button>

        </div>
      )
      
      

}


export const deleteAlbumYes = (setAlbums, deleteID, delName, delMinListeners, delMaxListeners, delMinYear, delMaxYear, delArtistID, delIDs, delIDsArt) => {
  axios.get('http://localhost:3000/albums/deleteAlbums', {//user has confirmered they want to delete, so we delete Albums
      params: { id: deleteID,  delName,  delArtistID, min_listeners: delMinListeners, max_listeners: delMaxListeners, min_year: delMinYear, max_year: delMaxYear, delIDs, delIDsArt } // Send filters as query parameters
    })
    .then(response => { 
      console.log("Fetched Albums:", response.data);
      setAlbums(response.data); // fetch data should be empty
    })
    .catch(error => {
      console.error('Error fetching albums:', error);
    });
  };

export default AlbumDelete;