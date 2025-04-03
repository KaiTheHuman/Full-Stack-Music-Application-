import React, { useState } from 'react';  //import react and axios
import axios from 'axios';
import "../index.css";

const AlbumCreate = ({setNoData, setAlbums, setUpdateButton, setDeleteButton, setDeleteWarning}) => {
      const [newName, setNewName] = useState(''); //set up values we will be using to create a new Album
      const [newArtist, setNewArtist] = useState('');
      const [newArtistID, setNewArtistID] = useState('');
      const [listenerCount, setListenerCount] = useState('');
      const [newYear, setNewYear] = useState('');

      const createAlbums = () => { //when user clicks create button
        setUpdateButton(false); //if the are you sure update button is up, take it down
        setDeleteButton(false);//same with delete are you sure button
        setDeleteWarning("");//get rid of delete warning message

        if(!newName){ //every Album must have a name
          setNoData('New Albums must have a name');

        }
        else if(newArtistID){ //if new Album was given an Artist ID to link to
          axios.get('http://localhost:3000/artists/getArtists', {
            params: { id: newArtistID, name: null, genre: null, min_listeners: null, max_listeners: null} 
          }) //fetch Artists info
            .then(artistResponse =>{
              if(!artistResponse || artistResponse.data.length ===0){ //if Artist doesnt exist, send message
                setAlbums([]); //this makes sure results is blank so message can appear
                setNoData("Artist is not in database");
              }
              else{ //if artist does exist, go to createAlbums fuction in albumController
                axios.get('http://localhost:3000/albums/createAlbums', {
                  params: { newName, newArtistID, listener_count: listenerCount, new_year: newYear } 
                })
                .then(response => { //then, get newly created Album using ID (ensures we get the correct one)
                  
                  axios.get('http://localhost:3000/albums/getAlbums', {
                    params: { id:response.data.insertId } 
                  })
                  .then(response => { //set selected Albums to be newly created album so that it appears on screen
                    console.log("Fetched Albums:", response.data);
                    setAlbums(response.data); 
                  }) 
                 
                })

              }
            
            } )}
          else if(newArtist){  //IF user gives us Artist name instead of ID
          axios.get('http://localhost:3000/artists/getArtists', { //fetch Artitsts data
            params: { id: null, name: newArtist, genre: null, min_listeners: null, max_listeners: null} 
          })
            .then(artistResponse =>{
              if(!artistResponse || artistResponse.data.length ===0){ //if artist doesnt exist tell user
                setAlbums([]);
                setNoData("Artist is not in database");
              }
              else if(artistResponse.data.length >1){ //if multiple artists share the same name, tell user to use ID
                setAlbums([]);
                setNoData("There are multiple Artists with that name, assign by ID instead");
              }
              else{ //artist exists and theres only 1
                setNewArtistID(artistResponse.data[0].id) //get artitists ID
                console.log(artistResponse.data[0].id)
                console.log(newArtistID)
                
                //create Album
                  axios.get('http://localhost:3000/albums/createAlbums', {
                    params: { newName, newArtistID: artistResponse.data[0].id, listener_count: listenerCount, new_year: newYear } // Send filters as query parameters
                  })
                  .then(response => { //get new Album using its ID
                    
                    axios.get('http://localhost:3000/albums/getAlbums', {
                      params: { id:response.data.insertId } 
                    })
                    .then(response => {
                      console.log("Fetched Albums:", response.data);
                      setAlbums(response.data);//display new Album
                    }) 
                  })
              }
            } )
        }
        else{ //OTHERWISE user hasnt connected new Album to artist at all

          axios.get('http://localhost:3000/albums/createAlbums', { //create new artist
            params: { newName, newArtistID, listener_count: listenerCount, new_year: newYear } 
          })
          .then(response => {//fetch new Album
            
            axios.get('http://localhost:3000/albums/getAlbums', {
              params: { id:response.data.insertId } 
            })
            .then(response => {
              console.log("Fetched Albums:", response.data);
              setAlbums(response.data); // display new album
            }) 
            
          })

        }
        
      };
      return (
        <div>
    
        {/*this is the field for inputting values to create new Album */ }
          <h2>Create a new Album</h2>
          <label>Name: </label>
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)} />

          <label>Artist: </label>
          <input type="text" value={newArtist} onChange={e => setNewArtist(e.target.value)} />
          <label>Artist ID: </label>
          <input type="number" value={newArtistID} onChange={e => setNewArtistID(e.target.value)} />
          
          <label>Number of Listens: </label>
          <input type="number" value={listenerCount} onChange={e => setListenerCount(e.target.value)} />
          <label>Year of release: </label>
          <input type="number" value={newYear} onChange={e => setNewYear(e.target.value)} />
    
          <button onClick={createAlbums}>Create</button>
    
         
        </div>
    
        
      );
    };

export default AlbumCreate;