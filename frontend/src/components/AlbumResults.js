import React from 'react'; //import react
import "../index.css";

const AlbumResults = ({noData, albums, setNoData, setAlbums, deleteButton, setDeleteButton, updateButton, setUpdateButton, updateAlbumYes,deleteAlbumYes,upID, upName, upArtist, upMaxListeners, upMinListeners,upMaxYear, upMinYear, upToName, upToArtist, upToListeners, upToYear, deleteID, delName, delArtist, delMinListeners, delMaxListeners, delMinYear, delMaxYear, deleteWarning, setDeleteWarning, upToArtistID, delArtistID, IDs, setIDs, setDelIDs,delIDsArt ,setDelIDsArt, upArtistID, setUpArtistID}) => {

  //results is only for displaying recived info, hence there are no functions
    return(
        <div>
          




             <div id="info">
      <h2>Results:</h2>

      {deleteWarning} {/*this is blank, only used to warn users if they have selected to delete whole Album */}

{/*Delete button appears showing all Albums you will be deleting, with a are you sure message*/}
      {deleteButton && (
        <div>
          <h3>Confirm you wish to delete: {albums.album_name}</h3>
          <ul>
            {albums.map((album) =>(
              <li key={album.id}> {album.album_name}</li>
            ))}
          </ul>
          <button onClick={() => {  //Yes Delete button. get all ID's for albums and their associated Artists
            const delIDs = albums.map((album) => album.id) || [];
            const delIDsArt = albums.map((album) => album.artist) || [];
          
            console.log(delIDs);
            setDelIDs(albums.id);
            setDelIDsArt(albums.artist);
            setDeleteWarning("");
            //function deleteAlbumYes is located in AlbumDelete, it sets them up to be deleted
            deleteAlbumYes(setAlbums, deleteID, delName, delMinListeners, delMaxListeners, delMinYear, delMaxYear, delArtistID, delIDs, delIDsArt);
            
          setDeleteButton(false);
            setNoData("Album Deleted");
          }}>Yes, Delete</button>
          <button onClick={() => { //if user clicks cancel, reset buttons
            setDeleteWarning("");
            setDeleteButton(false); 
          setAlbums([]); 
          setNoData("Deletion Cancelled");
          }}>Cancel</button>
          </div>
      )}

{updateButton && (
        <div>
          <h3>Confirm you wish to update: </h3>

          <button onClick={() => { /*Yes Update button. get all ID's for albums and their associated Artists. as well as years and listens*/
             const IDs = albums.map((album) => album.id) || [];
             const IDsArt = albums.map((album) => album.artist)|| [];
             const year=albums.map((album) => album.release_year)|| [];
             const listens=albums.map((album) => album.number_of_listens)|| [];
             console.log("IDsArt:", IDsArt);
             
            //updateAlbumYes sets albums up to be upated
            updateAlbumYes(setAlbums,upID, upName, upArtist, upMaxListeners, upMinListeners, upMaxYear, upMinYear, upToName, upToArtist, upToListeners, upToYear, upToArtistID, IDs, IDsArt, year, listens, upArtistID);

          setUpdateButton(false);
            setNoData("no albums found");
          }}>Yes, Update</button>
          <button onClick={() => {setUpdateButton(false); 
          setAlbums([]); 
          setNoData("Update Cancelled");
          }}>Cancel</button>
          </div>
      )}


{/*This section displays any information put into albums. also displays song_list names*/}

      {albums.length > 0 ? ( //check if albums array is empty
        <ul> 
          {albums.map((album, index) => { //if not empty loop through array
          //put song_list into Songs if they exist
            const songs = album.song_list ? JSON.parse(album.song_list) : [];
            return( //display informations, using songs.map to loop through the songs array we just made
            <li key={index}>
              Name: {album.album_name} |   Artist: {album.artist_name} |   Number of Listens:  {album.number_of_listens} | Year of release:  {album.release_year} | 
              Songs List: {songs.length > 0 ? songs.map(song => song.song_name).join(', '): 'None'}| 
              ID: {album.id}
            </li>
            );
          })}
        </ul>
      ) : (
        <p> {noData} </p>
      )}

{/*If Updating Album, this section shows what the new values would look like*/}
{updateButton && (
        <div>
          <h3>To: </h3>

          {albums.length > 0 ? (
        <ul>
          {albums.map((album, index) => {
            const songs = album.song_list ? JSON.parse(album.song_list) : [];
            return( //same as other mapping, but check for each value if a UpTo___ version exists, if so display new value instead
            <li key={index}> 
              {}
                {upToName ?(
                  <> New Name: {upToName}</>
                ) :(
                  <> Name: {album.album_name}</>
                )}
                 {upToArtist ?(
                  <> | New Artist: {upToArtist}</>
                ) :(
                  <>| Artist: {album.artist_name}</>
                )}
                {upToListeners ?(
                  <> | New Number of Listens:  {upToListeners}</>
                ) :(
                  <> | Number of Listens:  {album.number_of_listens}</>
                )}{upToYear ?(
                  <> | New Year: {upToYear}</>
                ) :(
                  <>|  Year of release: {album.release_year}</>
                )}
              
              | Songs List: {songs.length > 0 ? songs.map(song => song.song_name).join(', '): 'None'}| 
              ID: {album.id}
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
export default AlbumResults;