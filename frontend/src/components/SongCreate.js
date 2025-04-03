import React, { useState } from 'react';
import axios from 'axios';
import "../index.css";

const SongCreate = ({setNoData, setSongs, setUpdateButton, setDeleteButton, setDeleteWarning}) => {
      const [newName, setNewName] = useState(''); //set song create varaibles
      const [newAlbum, setNewAlbum] = useState('');
      const [newAlbumID, setNewAlbumID] = useState('');
      const [newYear, setNewYear] = useState('');

      const createSongs = () => { //if user clicks create
        setUpdateButton(false);
        setDeleteButton(false);
        setDeleteWarning("");

        if(!newName){
          //warn user that 
          setNoData('New Songs must have a name');

        }
        else if(newAlbumID){ //if song is connected to an album through ID
          axios.get('http://localhost:3000/albums/getAlbums', {
            params: { id: newAlbumID, name: null, genre: null, min_listeners: null, max_listeners: null} 
          }) //fetch album
            .then(albumResponse =>{
              if(!albumResponse || albumResponse.data.length ===0){ //if album doesnt exist say so
                setSongs([]);
                setNoData("Album is not in database");
              }
              else{
                console.log(newAlbumID); //else crete new Song
                axios.get('http://localhost:3000/songs/createSongs', {
                  params: { newName, newAlbumID, new_year: newYear } 
                })
                .then(response => {
                  
                  axios.get('http://localhost:3000/songs/getSongs', {
                    params: { id:response.data.insertId } //fetch newly made song with id
                  })
                  .then(response => {
                    console.log("Fetched Songs:", response.data);
                    setSongs(response.data); // display new song
                  }) 
                })

              }
            
            } )}
          else if(newAlbum){ //if song connects to album by name
          axios.get('http://localhost:3000/albums/getAlbums', {
            params: { id: null, name: newAlbum, genre: null, min_listeners: null, max_listeners: null} 
          }) //search for album
            .then(albumResponse =>{
              if(!albumResponse || albumResponse.data.length ===0){ //if album doesnt exist say so
                setSongs([]);
                setNoData("Album is not in database");
              }
              else if(albumResponse.data.length >1){ //if multiple albums share name say so
                setSongs([]);
                setNoData("There are multiple Songs with that name, assign by ID instead");
              }
              else{
                setNewAlbumID(albumResponse.data[0].id) //set AlbumID to be found album
                console.log(albumResponse.data[0].id)
                console.log(newAlbumID)
                
                
                  axios.get('http://localhost:3000/songs/createSongs', { //create new song
                    params: { newName, newAlbumID: albumResponse.data[0].id, new_year: newYear }
                  })
                  .then(response => {
                    
                    axios.get('http://localhost:3000/songs/getSongs', {
                      params: { id:response.data.insertId } //fetch for newly name song
                    })
                    .then(response => {
                      console.log("Fetched Songs:", response.data);
                      setSongs(response.data); //display
                    }) 
                  })
  
                

              }

            } )
          

        }
        else{ //else, new song has no album

          axios.get('http://localhost:3000/songs/createSongs', {
            params: { newName, newAlbumID, new_year: newYear } // create song
          })
          .then(response => {
            
            axios.get('http://localhost:3000/songs/getSongs', {
              params: { id:response.data.insertId } // fetch song
            })
            .then(response => {
              console.log("Fetched Songs:", response.data);
              setSongs(response.data); //display song
            }) 
          })

        }
        
      };
      return ( //form for creating song
        <div>
    
    
          <h2>Create a new Song</h2>
          <label>Name: </label>
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)} />

          <label>Album: </label>
          <input type="text" value={newAlbum} onChange={e => setNewAlbum(e.target.value)} />
          <label>Album ID: </label>
          <input type="number" value={newAlbumID} onChange={e => setNewAlbumID(e.target.value)} />

          <label>Year of release: </label>
          <input type="number" value={newYear} onChange={e => setNewYear(e.target.value)} />
    
          <button onClick={createSongs}>Create</button>
    
         
        </div>
    
        
      );
    };

export default SongCreate;