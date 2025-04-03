import React from 'react';  //import react and axios
import axios from 'axios';
import "../index.css";

const AlbumUpdate = ({setNoData, setAlbums, setUpdateButton, upID, setUpID, upName, setUpName,upArtist, setUpArtist, upMaxListeners, setUpMaxListeners, upMinListeners, setUpMinListeners, upMaxYear, setUpMaxYear, upMinYear, setUpMinYear, upToName, setUpToName, upToArtist, setUpToArtist, upToListeners, setUpToListeners,upToYear, setUpToYear, setDeleteButton, setDeleteWarning, upToArtistID, setUpToArtistID, upArtistID, setUpArtistID}) => {


    const updateAlbums = () => { //when update buttons clicked
        setNoData('No albums found'); 
        setDeleteButton(false);
        setDeleteWarning("");
        let continueCheck=false; //due to the chaos trying to update something is i put this continue check in to stop the sheer amount of nested if's
        if(!upToArtist && !upToName && !upToListeners && !upToYear && !upToArtistID)
        { //if no changes set say so
          setAlbums([]);
            setNoData("you've set no changes");
        }
        else{
          //i changed the way i usually handle the artist VS artist ID seperation here, i havnt done the same for everything else as im low on time

          if(upArtist && !upArtistID){  //if artist name chosen and no ID
            axios.get('http://localhost:3000/artists/getArtists', {
              params: { name: upArtist} //search artist
            })
            .then(response => {
              if(!response || response.data.length ===0){ //if artist doesnt exist tell user
                setAlbums([]);
                setNoData("Paramater Artist is not in database");
              }
              else if(response.data.length >1){ //if multiple artists tell user
                setAlbums([]);
                setNoData("Mutliple Paramater Artists, choose using ID instead");
              }
              else{
                setUpArtistID(response.data[0].id);  //else, set Artist ID and set continueCheck
                continueCheck = true;
              }
            }
            )

          }



          if((upArtist && continueCheck === true) || (!upArtist)) //if no artist name | a name but continuecheck is true meaning artistID has been set
          {
            axios.get('http://localhost:3000/albums/getAlbums', { //get albums to be updated
              params: { id: upID, name: upName, Artist: upArtist, min_listeners: upMinListeners, max_listeners: upMaxListeners , min_year: upMinYear, max_year: upMaxYear, artistID: upArtistID} // Send filters as query parameters
            })
            .then(response => {
              
              setAlbums(response.data); //display Albums
              setNoData("no albums found");

              if(upToArtistID && response.data&& response.data.length>0){ //if new Artist ID set
                axios.get('http://localhost:3000/artists/getArtists', { //fetch Artist
                  params: { id: upToArtistID, name: null, genre: null, min_listeners: null, max_listeners: null} 
                })
                  .then(artistResponse =>{ 
                    if(!artistResponse || artistResponse.data.length ===0){ //if no artist say so
                      setAlbums([]);
                      setNoData("Update to Artist is not in database");
                    }
                    else{
                        setUpdateButton(true); //if new artist exists, set up update button
                    }

                  } )
                

              }
              else if(upToArtist&& response.data&& response.data.length>0){ //else, if given a artist name
                axios.get('http://localhost:3000/artists/getArtists', {
                  params: { id: null, name: upToArtist, genre: null, min_listeners: null, max_listeners: null} 
                }) //search artist
                  .then(artistResponse =>{
                    if(!artistResponse || artistResponse.data.length ===0){ //if no artist say so
                      setAlbums([]);
                      setNoData("Update to Artist is not in database");
                    }
                    else if(artistResponse.data.length >1){ //if multiple artists say so
                      setAlbums([]);
                      setNoData("There are multiple Update to Artists with that name, assign by ID instead");
                    }
                    else{ 
                      setUpToArtistID(artistResponse.data[0].id) //set Artist ID
                        setUpdateButton(true); // set up button
                    }

                  } )
                

              }
              else {
              if(response.data&& response.data.length>0){
                setUpdateButton(true); //if data exists, set up button
              }

              }
          
            })
            .catch(error => {
              console.error('Error fetching albums:', error);
            });

          }

          

            


        }
       
      };
      
      
      return( //form for update
        <div>
             <h2>update Album(s)</h2>
      <h3>parameters</h3>
      <label>ID: </label>
      <input type="number" value={upID} onChange={e => setUpID(e.target.value)} />
      <label>Name: </label>
      <input type="text" value={upName} onChange={e => setUpName(e.target.value)} />
      <label>Artist: </label>
      <input type="text" value={upArtist} onChange={e => setUpArtist(e.target.value)} />
      <label>Artist ID: </label>
      <input type="text" value={upArtistID} onChange={e => setUpArtistID(e.target.value)} />
      
      <label> Minimum number of Listeners: </label>
      <input type="number" value={upMinListeners} onChange={e => setUpMinListeners(e.target.value)} />

      <label> Maximum number of Listeners: </label>
      <input type="number" value={upMaxListeners} onChange={e => setUpMaxListeners(e.target.value)} />

      <label> From Year: </label>
      <input type="number" value={upMinYear} onChange={e => setUpMinYear(e.target.value)} />

      <label> To Year: </label>
      <input type="number" value={upMaxYear} onChange={e => setUpMaxYear(e.target.value)} />
      <h3>Update to:</h3>
      <label>Name: </label>
      <input type="text" value={upToName} onChange={e => setUpToName(e.target.value)} />
      <label>Artist: </label>
      <input type="text" value={upToArtist} onChange={e => setUpToArtist(e.target.value)} />
      <label>Artist ID: </label>
      <input type="text" value={upToArtistID} onChange={e => setUpToArtistID(e.target.value)} />
      <label> Number of Listeners: </label>
      <input type="number" value={upToListeners} onChange={e => setUpToListeners(e.target.value)} />
      <label> Release Year: </label>
      <input type="number" value={upToYear} onChange={e => setUpToYear(e.target.value)} />

      <button onClick={updateAlbums}>Update</button>

        </div>

      );


};


export const updateAlbumYes = (setAlbums, upID, upName, upArtist, upMaxListeners, upMinListeners, upMaxYear, upMinYear, upToName, upToArtist, upToListeners, upToYear, upToArtistID, IDs, IDsArt, upArtistID) => {
  //if user presses yes for are you sure
    axios.get('http://localhost:3000/albums/updateAlbums', {
      params: { id: upID,  upName, upArtist, min_listeners: upMinListeners, max_listeners: upMaxListeners, min_year: upMinYear, max_year: upMaxYear, upToName, upToArtist, upToListeners, upToYear, upToArtistID, IDs,IDsArt, upArtistID } // Send filters as query parameters
    }) //update Albums
    .then(response => {
      console.log("Fetched Albums:", response.data);
  
      axios.get('http://localhost:3000/albums/getAlbums', {
        params: { id: upID,  name: upToName, artist: upToArtist, min_listeners: upToListeners, max_listeners: upToListeners, min_year:upToYear, max_year: upToYear, artistID: upToArtistID} // Send filters as query parameters
      }) //fetch updated albums using upTo____
      .then(response => {
        console.log("Fetched Albums:", response.data);
        setAlbums(response.data); //display information
      }) 
    })
    .catch(error => {
      console.error('Error fetching albums:', error);
    });
  };

export default AlbumUpdate;