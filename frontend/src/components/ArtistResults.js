import React from 'react';
import "../index.css";

const ArtistResults = ({noData, artists, setNoData, setArtists, deleteButton, setDeleteButton, updateButton, setUpdateButton, updateArtistYes,deleteArtistYes,upID, upName, upGenre, upMaxListeners, upMinListeners, upToName, upToGenre, upToListeners, deleteID, delName, delGenre, delMinListeners, delMaxListeners, deleteWarning, setDeleteWarning}) => {
//since this is used for diaplaying stuff theres no fucntions

    return(
        <div>

          
             <div id="info">
      <h2>Results:</h2>

      {deleteWarning} {/*this is where the user would get a warning if theyve selected to delete all artists */}

      {deleteButton && ( //are you sure button for deleting
        <div>
          <h3>Confirm you wish to delete: {artists.artist_name}</h3>
          <ul>
            {artists.map((artist) =>(
              <li key={artist.id}> {artist.artist_name}</li>
            ))}
          </ul>
          <button onClick={() => { //if user clicks yes
            setDeleteWarning("");
            //deleteArtistYes is a function in DeleteArtists
            deleteArtistYes(setArtists, deleteID, delName, delGenre, delMinListeners, delMaxListeners);
          setDeleteButton(false);
            setNoData("Artist Deleted");
          }}>Yes, Delete</button>
          <button onClick={() => { //if they click no reset everything
            setDeleteWarning("");
            setDeleteButton(false); 
          setArtists([]); 
          setNoData("Deletion Cancelled");
          }}>Cancel</button>
          </div>
      )}

{updateButton && ( //update are you sure button
        <div>
          <h3>Confirm you wish to update: </h3>

          <button onClick={() => {
            //function is in UpdateArtist
            updateArtistYes(setArtists,upID, upName, upGenre, upMaxListeners, upMinListeners, upToName, upToGenre, upToListeners);

          setUpdateButton(false);
            setNoData("no artists found");
          }}>Yes, Update</button>
          <button onClick={() => {setUpdateButton(false); 
          setArtists([]); 
          setNoData("Update Cancelled");
          }}>Cancel</button>
          </div>
      )}





      {artists.length > 0 ? ( //Displays any information is artists array
        <ul>
          {artists.map((artist, index) => { //map loops through array
            const songs = artist.song_list ? JSON.parse(artist.song_list) : []; //put song list in songs and album_lists in albums
            let albums = artist.album_list ? JSON.parse(artist.album_list) : [];
            if (!Array.isArray(albums)) albums = []; 
            return( //display information, using map to only show song and album names
            <li key={index}>
              Name: {artist.artist_name} |   Genre: {artist.genre} |   Monthly Listeners:  {artist.monthly_listeners} | 
              Songs List: {songs.length > 0 ? songs.map(song => song.song_name).join(', '): 'None'}| 
              Albums List: {albums.length > 0 ? albums.map(album => album.album_name).join(', '): 'None'} | 
              ID: {artist.id}
            </li>
            );
          })}
        </ul>
      ) : (
        <p> {noData} </p>
      )}


{updateButton && ( //display info but with any new info you want updated added
        <div>
          <h3>To: </h3>

          {artists.length > 0 ? (
        <ul>
          {artists.map((artist, index) => {
            let songs = artist.song_list ? JSON.parse(artist.song_list) : [];
            let albums = artist.album_list ? JSON.parse(artist.album_list) : [];
            if (!Array.isArray(albums)) albums = [];
            return(
            <li key={index}>
              {}
                {upToName ?(
                  <> New Name: {upToName}</>
                ) :(
                  <> Name: {artist.artist_name}</>
                )}
                 {upToGenre ?(
                  <> New Genre: {upToGenre}</>
                ) :(
                  <> Genre: {artist.genre}</>
                )}
                {upToListeners ?(
                  <> New Monthly Listeners: {upToListeners}</>
                ) :(
                  <> Monthly Listeners: {artist.monthly_listeners}</>
                )}
              
              Songs List: {songs.length > 0 ? songs.map(song => song.song_name).join(', '): 'None'}| 
              Albums List: {albums.length > 0 ? albums.map(album => album.album_name).join(', '): 'None'} | 
              ID: {artist.id}
            </li>
            );
          })}
        </ul>
      ) : (
        <p> {noData} </p>
      )}
          </div>

          
      )}
    </div>
        </div>
    )
}
export default ArtistResults;