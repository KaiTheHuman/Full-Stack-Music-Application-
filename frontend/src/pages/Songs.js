import React, { useState} from "react";  //import react useState and components
import SongSearch from "../components/SongSearch";
import SongCreate from "../components/SongCreate";
import SongUpdate from "../components/SongUpdate";
import SongDelete from "../components/SongDelete";
import SongResults from "../components/SongResults";
import { updateSongYes } from "../components/SongUpdate";
import { deleteSongYes } from "../components/SongDelete";


const Songs = () => {  
    const [songs, setSongs] = useState([]); // array of selected songs
    const [noData, setNoData] = useState('No albums found'); //message for if results are empty
    const [updateButton, setUpdateButton] = useState(false); //button booleans for a are you sure feature
    const [deleteButton, setDeleteButton] = useState(false);

    const [upName, setUpName] = useState(''); //Update values, up___ for parameters, upTo____ for what theyre changing to
    const [upAlbum, setUpAlbum] = useState('');
    const [upAlbumID, setUpAlbumID] = useState('');
    const [upMinYear, setUpMinYear] = useState('');
    const [upMaxYear, setUpMaxYear] = useState('');
    const [upID, setUpID] = useState('');
    const [upToName, setUpToName] = useState('');
    const [upToAlbum, setUpToAlbum] = useState('');
    const [upToAlbumID, setUpToAlbumID] = useState('');
    const [upToYear, setUpToYear] = useState('');

        const [deleteID, setDeleteID] = useState('');
        const [delName, setDelName] = useState('');
        const [delAlbum, setDelAlbum] = useState('');
        const [delAlbumID, setDelAlbumID] = useState('');
        const [delMinYear, setDelMinYear] = useState('');
        const [delMaxYear, setDelMaxYear] = useState('');
        const [deleteWarning, setDeleteWarning] = useState('');

        const [IDs, setIDs]= useState([]); //array of IDs of selected songs
        const [delIDs, setDelIDs]= useState([]); //array of song IDs to be deleted
        const [delIDsAl, setDelIDsAl]= useState([]); //array of artists connected to deleted songs IDs
        
  
    return (
        <div>
      <h1>Songs Page</h1>
       <SongSearch setNoData={setNoData} setSongs={setSongs} setUpdateButton={setUpdateButton}  setDeleteButton={setDeleteButton} setDeleteWarning={setDeleteWarning}/> 
       <SongCreate  setNoData={setNoData} setSongs={setSongs}  setUpdateButton={setUpdateButton} setDeleteButton={setDeleteButton} setDeleteWarning={setDeleteWarning}/>
       <SongUpdate setNoData={setNoData} setSongs={setSongs}  setUpdateButton={setUpdateButton} upID={upID} setUpID={setUpID} upName={upName} setUpName={setUpName} upAlbum={upAlbum} setUpAlbum={setUpAlbum} upMaxYear={upMaxYear} setUpMaxYear={setUpMaxYear} upMinYear={upMinYear} setUpMinYear={setUpMinYear} upToName={upToName} setUpToName={setUpToName} upToAlbum={upToAlbum} setUpToAlbum={setUpToAlbum} upToYear={upToYear} setUpToYear={setUpToYear} setDeleteButton={setDeleteButton} setDeleteWarning={setDeleteWarning} upToAlbumID={upToAlbumID} setUpToAlbumID={setUpToAlbumID} IDs={IDs} upAlbumID={upAlbumID} setUpAlbumID={setUpAlbumID}/>
       <SongDelete setNoData={setNoData} setSongs={setSongs}  setDeleteButton={setDeleteButton} deleteID={deleteID} setDeleteID={setDeleteID} delName={delName} setDelName={setDelName} delAlbum={delAlbum} setDelAlbum={setDelAlbum} delMinYear={delMinYear} setDelMinYear={setDelMinYear} delMaxYear={delMaxYear} setDelMaxYear={setDelMaxYear} setUpdateButton={setUpdateButton} setDeleteWarning={setDeleteWarning} delAlbumID={delAlbumID} setDelAlbumID={setDelAlbumID} delIDs={delIDs} delIDsAl={delIDsAl}/>
       <SongResults  noData={noData} songs={songs} setNoData={setNoData} setSongs={setSongs}   deleteButton={deleteButton} setDeleteButton={setDeleteButton} updateButton={updateButton} setUpdateButton={setUpdateButton} updateSongYes={updateSongYes} deleteSongYes={deleteSongYes} upID={upID} upName={upName} upAlbum={upAlbum}  upMaxYear={upMaxYear} upMinYear={upMinYear} upToName={upToName} upToAlbum={upToAlbum} upToYear={upToYear} deleteID={deleteID} delName={delName} delAlbum={delAlbum} delMinYear={delMinYear} delMaxYear={delMaxYear} deleteWarning={deleteWarning} setDeleteWarning={setDeleteWarning} upToAlbumID={upToAlbumID} delAlbumID={delAlbumID} IDs={IDs} setIDs={setIDs} setDelIDs={setDelIDs} delIDsAl={delIDsAl} setDelIDsAl={setDelIDsAl} upAlbumID={upAlbumID} />
    </div>
    );
};



export default Songs;
/*----IMPORTANT NOTE----
the way i used states is very innafficient
i shouldve done

const [updateData, setUpdateData] = useState({
  upID: '',
  upName: '',
  upAlbum: '',
  upAlbumID: '',
  upMinYear: '',
  upMaxYear: '',
  upToName: '',
  upToAlbum: '',
  upToAlbumID: '',
  upToYear: '',
});

then any data i needed couldve been updated via  setUpdateData({ ...updateData, upName: 'New Song Name' });
and then i couldve accessed the info using updateData.upName
i however only have a day left to finish this and am not going to change it now




*/ 