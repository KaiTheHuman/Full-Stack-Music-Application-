import React from 'react';
import axios from 'axios';
import "../index.css";

const SongDelete = ({setNoData, setSongs, setDeleteButton, deleteID, setDeleteID, delName, setDelName, delAlbum, setDelAlbum, delMinYear, setDelMinYear, delMaxYear, setDelMaxYear, setUpdateButton, setDeleteWarning, delAlbumID, setDelAlbumID}) => {

    const deleteSongs = () => { //if user clicks delete
        setNoData('No songs found');
        setUpdateButton(false);
        if(!deleteID && !delName && !delAlbum && !delAlbumID && !delMaxYear && !delMinYear)
          { //if user has no paramters say warn them this deletes everything
            setDeleteWarning("You have selected All, are you sure you want to delete whole Album database");
          }
         if(delAlbumID){ //user has album ID selected
          axios.get('http://localhost:3000/albums/getAlbums', {
            params: { id: delAlbumID, name: null, genre: null, min_listeners: null, max_listeners: null} 
          }) //fetch Album
            .then(albumResponse =>{
              if(!albumResponse || albumResponse.data.length ===0){ //if album doesnt exist say so
                setSongs([]);
                setNoData("Song is not in database");
              }
              else{
                
                  axios.get('http://localhost:3000/songs/getSongs', { //fetch songs to be deleted
                    params: { id: deleteID, name: delName, album: delAlbum, min_year: delMinYear, max_year: delMaxYear, albumID:delAlbumID } // Send filters as query parameters
                  })
                  .then(response => {
                    console.log("Fetched Songs:", response.data);
                    setSongs(response.data); // display songs
                    if(response.data&& response.data.length>0){
                      setDeleteButton(true); //set button
                    }
                
                  })

              }
            
            } )}
          else if(delAlbum){ //if album selected through name
          axios.get('http://localhost:3000/albums/getAlbums', {
            params: { id: null, name: delAlbum, genre: null, min_listeners: null, max_listeners: null} 
          }) //fetch album
            .then(albumResponse =>{
              if(!albumResponse || albumResponse.data.length ===0){ //if no album say so
                setSongs([]);
                setNoData(" Album is not in database");
              }
              else if(albumResponse.data.length >1){ //if multiple albums say so
                setSongs([]);
                setNoData("There are multiple Album with that name, assign by ID instead");
              }
              else{
                setDelAlbumID(albumResponse.data[0].id) //set album id
                  axios.get('http://localhost:3000/songs/getSongs', {
                    params: { id: deleteID, name: delName, album: delAlbum, min_year: delMinYear, max_year: delMaxYear, albumID:delAlbumID } // Send filters as query parameters
                  }) //fetch songs to be deleted
                  .then(response => {
                    console.log("Fetched Songs:", response.data);
                    setSongs(response.data); //display songs
                    if(response.data&& response.data.length>0){
                      setDeleteButton(true); //set up are you sure button
                    }
                
                  })
                
                  
  
                

              }

            } )
          

        }
        else { //else no albums selected
        axios.get('http://localhost:3000/songs/getSongs', {
          params: { id: deleteID, name: delName, album: delAlbum, min_year: delMinYear, max_year: delMaxYear, albumID:delAlbumID } // Send filters as query parameters
        }) //fetch songs to be deleted
        .then(response => {
          console.log("Fetched Songs:", response.data);
          setSongs(response.data); // dispaly songs
          if(response.data&& response.data.length>0){
            setDeleteButton(true); //set up are you sure button
          }
      
        })
        .catch(error => {
          console.error('Error fetching songs:', error);
        });
      };
    }

      return( //form to delete songs
        <div>
            <h2>Delete Song(s)</h2>
      <label>ID: </label>
      <input type="number" value={deleteID} onChange={e => setDeleteID(e.target.value)} />
      <label>Name: </label>
      <input type="text" value={delName} onChange={e => setDelName(e.target.value)} />
      <label>Album: </label>
      <input type="text" value={delAlbum} onChange={e => setDelAlbum(e.target.value)} />
      <label>Album ID: </label>
      <input type="number" value={delAlbumID} onChange={e => setDelAlbumID(e.target.value)} />
    
      <label> From Year: </label>
      <input type="number" value={delMinYear} onChange={e => setDelMinYear(e.target.value)} />

      <label> To Year: </label>
      <input type="number" value={delMaxYear} onChange={e => setDelMaxYear(e.target.value)} />

      <button onClick={deleteSongs}>Delete</button>

        </div>
      )
      
      

}


export const deleteSongYes = (setSongs, deleteID, delName, delAlbum, delMinYear, delMaxYear, delAlbumID, delIDs, delIDsAl) => {
  //if user presses yes for are you sure
  axios.get('http://localhost:3000/songs/deleteSongs', {
       //delete songs 
      params: { id: deleteID,  delName,  delAlbumID, min_year: delMinYear, max_year: delMaxYear, delIDs, delIDsAl } // Send filters as query parameters
    })
    .then(response => {
      console.log("Fetched Songs:", response.data);
      setSongs(response.data); // this should be blank
    })
    .catch(error => {
      console.error('Error fetching Songs:', error);
    });
  };

export default SongDelete;