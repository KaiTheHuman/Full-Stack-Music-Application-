import React from 'react';
import "../index.css";

const SongResults = ({noData, songs, setNoData, setSongs, deleteButton, setDeleteButton, updateButton, setUpdateButton, updateSongYes,deleteSongYes,upID, upName, upAlbum,upMaxYear, upMinYear, upToName, upToAlbum, upToYear, deleteID, delName, delAlbum, delMinYear, delMaxYear, deleteWarning, setDeleteWarning, upToAlbumID, delAlbumID, IDs, setIDs, setDelIDs,delIDsAl ,setDelIDsAl, upAlbumID}) => {
//this displays info

    return(
        <div>

          
             <div id="info">
      <h2>Results:</h2>

      {deleteWarning} {/*puts up a warning if youre deleting all songs */}

      {deleteButton && ( //are you sure delete button
        <div>
          <h3>Confirm you wish to delete: {songs.song_name}</h3>
          <ul>
            {songs.map((song) =>(
              <li key={song.id}> {song.song_name}</li>
            ))}
          </ul>
          <button onClick={() => {
            const delIDs = songs.map((song) => song.id) || [];
            const delIDsAl = songs.map((song) => song.album) || [];
          
            console.log(delIDs);
            setDelIDs(songs.id);
            setDelIDsAl(songs.album);
            setDeleteWarning("");
            deleteSongYes(setSongs, deleteID, delName, delAlbum, delMinYear, delMaxYear, delAlbumID, delIDs, delIDsAl);
          setDeleteButton(false);
            setNoData("Song Deleted");
          }}>Yes, Delete</button>
          <button onClick={() => {
            setDeleteWarning("");
            setDeleteButton(false); 
          setSongs([]); 
          setNoData("Deletion Cancelled");
          }}>Cancel</button>
          </div>
      )}

{updateButton && ( //are you sure update button
        <div>
          <h3>Confirm you wish to update: </h3>

          <button onClick={() => {
             const IDs = songs.map((song) => song.id) || [];
             const IDsAl = songs.map((song) => song.album) || [];
    
             const year=songs.map((song) => song.release_year);
             console.log("IDsAl:", IDsAl);

            updateSongYes(setSongs,upID, upName, upAlbum, upMaxYear, upMinYear, upToName, upToAlbum, upToYear, upToAlbumID, IDs, IDsAl, year, upAlbumID);

          setUpdateButton(false);
            setNoData("no Songs found");
          }}>Yes, Update</button>
          <button onClick={() => {setUpdateButton(false); 
          setSongs([]); 
          setNoData("Update Cancelled");
          }}>Cancel</button>
          </div>
      )}




      {songs.length > 0 ? ( //if songs array isnt empty, map loops through it and displays it
        <ul>
          {songs.map((song, index) => {
            return(
            <li key={index}>
              Name: {song.song_name} |   Album: {song.album_name} |    Year of release:  {song.release_year} | 
              ID: {song.id}
            </li>
            );
          })}
        </ul>
      ) : (
        <p> {noData} </p>
      )}


{updateButton && ( //displays what songs will be updated to 
        <div>
          <h3>To: </h3>

          {songs.length > 0 ? (
        <ul>
          {songs.map((song, index) => {
            return(
            <li key={index}>
              {}
                {upToName ?(
                  <> New Name: {upToName}</>
                ) :(
                  <> Name: {song.song_name}</>
                )}
                 {upToAlbum ?(
                  <> New Album: {upToAlbum}</>
                ) :(
                  <> Album: {song.album_name}</>
                )}
                {upToYear ?(
                  <> New Year: {upToYear}</>
                ) :(
                  <> Year of release: {song.release_year}</>
                )}| 
              ID: {song.id}
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
export default SongResults;