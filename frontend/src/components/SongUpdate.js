import React from 'react';
import axios from 'axios';
import "../index.css";

const SongUpdate = ({setNoData, setSongs, setUpdateButton, upID, setUpID, upName, setUpName,upAlbum, setUpAlbum , upMaxYear, setUpMaxYear, upMinYear, setUpMinYear, upToName, setUpToName, upToAlbum, setUpToAlbum, upToYear, setUpToYear, setDeleteButton, setDeleteWarning, upToAlbumID, setUpToAlbumID, upAlbumID, setUpAlbumID }) => {


    const updateSongs = () => { //if user clicks update
        setNoData('No songs found');
        setDeleteButton(false);
        setDeleteWarning("");
        let continueCheck=false;
        if(!upToAlbum && !upToName && !upToYear && !upToAlbumID)
        { //if no changes set say so
          setSongs([]);
            setNoData("you've set no changes");
        }
        else{
          if(upAlbum){ //if album name inputted
            axios.get('http://localhost:3000/albums/getAlbums', {
              params: { name: upAlbum} // seach for album
            })
            .then(response => {
              if(!response || response.data.length ===0){ //if no album say so
                setSongs([]);
                setNoData("Paramater Album is not in database");
              }
              else if(response.data.length >1){ //if multiple albums say so
                setSongs([]);
                setNoData("Mutliple Paramater Albums, choose using ID instead");
              }
              else{ 
                setUpAlbumID(response.data[0].id); //set album ID
                continueCheck = true; //continue check to say yes nwe album ID has been set
              }
            }
            )

          }
          if((upAlbum && continueCheck === true) || (!upAlbum)) //if new album ID or not
            {
              axios.get('http://localhost:3000/songs/getSongs', { //fetch songs
                params: { id: upID, name: upName, Album: upAlbum, min_year: upMinYear, max_year: upMaxYear, albumID: upAlbumID} // Send filters as query parameters
              })
              .then(response => {
                setSongs(response.data); //display them
                setNoData("no songs found");

                if(upToAlbumID&& response.data&& response.data.length>0){ //if being updated to a new album ID
                  axios.get('http://localhost:3000/albums/getAlbums', {
                    params: { id: upToAlbumID, name: null, genre: null, min_listeners: null, max_listeners: null} 
                  }) //fetch new Album
                    .then(albumResponse =>{
                      if(!albumResponse || albumResponse.data.length ===0){ //if doesnt exist say so
                        setSongs([]);
                        setNoData("Update to Album is not in database");
                      }
                      else{
                          setUpdateButton(true); //else set are you sure update button
                      }

                    } )
                  

                }
                if(upToAlbum && response.data&& response.data.length>0){ //if album set using name
                  axios.get('http://localhost:3000/albums/getAlbums', {
                    params: { id: null, name: upToAlbum, genre: null, min_listeners: null, max_listeners: null} 
                  }) //search for album
                    .then(albumResponse =>{
                      if(!albumResponse || albumResponse.data.length ===0){//if album doesnt exist say so
                        setSongs([]);
                        setNoData("Update to Album is not in database");
                      }
                      else if(albumResponse.data.length >1){ //if multiple albums say so
                        setSongs([]);
                        setNoData("There are multiple Update to Albums with that name, assign by ID instead");
                      }
                      else{
                        setUpToAlbumID(albumResponse.data[0].id) //set up album ID
                          setUpdateButton(true); //are you sure button
                      }

                    } )
                  

                }
                if(!upToAlbum && !upToAlbumID &&response.data&& response.data.length>0){// else if no album set at all
                  setUpdateButton(true); //set up button
                

                }
            
              })
              .catch(error => {
                console.error('Error fetching songs:', error);
              });
            }

           


        }
       
      };
      
      
      return( //update form
        <div>
             <h2>update Song(s)</h2>
      <h3>parameters</h3>
      <label>ID: </label>
      <input type="number" value={upID} onChange={e => setUpID(e.target.value)} />
      <label>Name: </label>
      <input type="text" value={upName} onChange={e => setUpName(e.target.value)} />
      <label>Album: </label>
      <input type="text" value={upAlbum} onChange={e => setUpAlbum(e.target.value)} />

      <label> From Year: </label>
      <input type="number" value={upMinYear} onChange={e => setUpMinYear(e.target.value)} />

      <label> To Year: </label>
      <input type="number" value={upMaxYear} onChange={e => setUpMaxYear(e.target.value)} />
      <h3>Update to:</h3>
      <label>Name: </label>
      <input type="text" value={upToName} onChange={e => setUpToName(e.target.value)} />
      <label>Album: </label>
      <input type="text" value={upToAlbum} onChange={e => setUpToAlbum(e.target.value)} />
      <label>Album ID: </label>
      <input type="text" value={upToAlbumID} onChange={e => setUpToAlbumID(e.target.value)} />
      <label> Release Year: </label>
      <input type="number" value={upToYear} onChange={e => setUpToYear(e.target.value)} />

      <button onClick={updateSongs}>Update</button>

        </div>

      );


};


export const updateSongYes = (setSongs, upID, upName, upAlbum, upMaxYear, upMinYear, upToName, upToAlbum, upToYear, upToAlbumID, IDs, IDsAl, upAlbumID) => {
  //if user says yes for are you sure
    axios.get('http://localhost:3000/songs/updateSongs', {
      params: { id: upID,  upName, min_year: upMinYear, max_year: upMaxYear, upToName, upToYear, upToAlbumID, IDs,IDsAl, upAlbumID } // Send filters as query parameters
    }) //update songs
    .then(response => {
      console.log("Fetched Songs:", response.data);
  
      axios.get('http://localhost:3000/songs/getSongs', {
        params: { id: upID,  name: upToName, album: upToAlbum, min_year:upToYear, max_year: upToYear, albumID: upToAlbumID} // Send filters as query parameters
      }) //fetch updated songs
      .then(response => {
        console.log("Fetched Songs:", response.data);
        setSongs(response.data); // display
      })
    })
    .catch(error => {
      console.error('Error fetching songs:', error);
    });
  };

export default SongUpdate;