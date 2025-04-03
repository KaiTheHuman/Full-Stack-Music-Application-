import React, { useState} from "react"; //import react and useState
import AlbumSearch from "../components/AlbumSearch"; //import Album components
import AlbumCreate from "../components/AlbumCreate";
import AlbumUpdate from "../components/AlbumUpdate";
import AlbumDelete from "../components/AlbumDelete";
import AlbumResults from "../components/AlbumResults";
import { updateAlbumYes } from "../components/AlbumUpdate"; //import sub components for the are you sure buttons
import { deleteAlbumYes } from "../components/AlbumDelete";


const Albums = () => {  
    const [albums, setAlbums] = useState([]); // array for selected Albums
    const [noData, setNoData] = useState('No albums found'); //message for when Results: are empty
    const [updateButton, setUpdateButton] = useState(false); //for the are you sure buttons, set false
    const [deleteButton, setDeleteButton] = useState(false);

    const [upName, setUpName] = useState('');   //update varibles, all Up____ are for the parameters and UpTo___ are what theyre being updated to
    const [upArtist, setUpArtist] = useState(''); //placed here for the are you sure feature, can be accessed by AlbumUpdate and AlbumResults
    const [upArtistID, setUpArtistID] = useState('');
    const [upMinListeners, setUpMinListeners] = useState('');
    const [upMaxListeners, setUpMaxListeners] = useState('');
    const [upMinYear, setUpMinYear] = useState('');
    const [upMaxYear, setUpMaxYear] = useState('');
    const [upID, setUpID] = useState('');
    const [upToName, setUpToName] = useState('');
    const [upToArtist, setUpToArtist] = useState('');
    const [upToArtistID, setUpToArtistID] = useState('');
    const [upToListeners, setUpToListeners] = useState('');
    const [upToYear, setUpToYear] = useState('');

        const [deleteID, setDeleteID] = useState('');//Delete variables, can be accessed by AlbumDelete and AlbumResults
        const [delName, setDelName] = useState('');
        const [delArtist, setDelArtist] = useState('');
        const [delArtistID, setDelArtistID] = useState('');
        const [delMinListeners, setDelMinListeners] = useState('');
        const [delMaxListeners, setDelMaxListeners] = useState('');
        const [delMinYear, setDelMinYear] = useState('');
        const [delMaxYear, setDelMaxYear] = useState('');
        const [deleteWarning, setDeleteWarning] = useState('');

        const [IDs, setIDs]= useState([]); //this is the array of ID's from the albums
        const [delIDs, setDelIDs]= useState([]); //this is the array of ID's we want deleted
        const [delIDsArt, setDelIDsArt]= useState([]); //array of artists IDs attached to albums we want deleted
        
  
    return ( //all the componenets with all the shared varaibles connected to them.
        <div>
      <h1>Albums Page</h1>
       <AlbumSearch setNoData={setNoData} setAlbums={setAlbums} setUpdateButton={setUpdateButton}  setDeleteButton={setDeleteButton} setDeleteWarning={setDeleteWarning}/> {/* Search Form */}
       <AlbumCreate  setNoData={setNoData} setAlbums={setAlbums} setUpdateButton={setUpdateButton} setDeleteButton={setDeleteButton} setDeleteWarning={setDeleteWarning}/>{}
       <AlbumUpdate setNoData={setNoData} setAlbums={setAlbums} setUpdateButton={setUpdateButton} upID={upID} setUpID={setUpID} upName={upName} setUpName={setUpName} upArtist={upArtist} setUpArtist={setUpArtist} upMaxListeners={upMaxListeners} setUpMaxListeners={setUpMaxListeners} upMinListeners={upMinListeners} setUpMinListeners={setUpMinListeners} upMaxYear={upMaxYear} setUpMaxYear={setUpMaxYear} upMinYear={upMinYear} setUpMinYear={setUpMinYear} upToName={upToName} setUpToName={setUpToName} upToArtist={upToArtist} setUpToArtist={setUpToArtist} upToListeners={upToListeners} setUpToListeners={setUpToListeners} upToYear={upToYear} setUpToYear={setUpToYear} setDeleteButton={setDeleteButton} setDeleteWarning={setDeleteWarning} upToArtistID={upToArtistID} setUpToArtistID={setUpToArtistID} IDs={IDs} upArtistID={upArtistID} setUpArtistID={setUpArtistID} />{}
       <AlbumDelete setNoData={setNoData} setAlbums={setAlbums} setDeleteButton={setDeleteButton} deleteID={deleteID} setDeleteID={setDeleteID} delName={delName} setDelName={setDelName} delArtist={delArtist} setDelArtist={setDelArtist} delMinListeners={delMinListeners} setDelMinListeners={setDelMinListeners} delMaxListeners={delMaxListeners} setDelMaxListeners={setDelMaxListeners} delMinYear={delMinYear} setDelMinYear={setDelMinYear} delMaxYear={delMaxYear} setDelMaxYear={setDelMaxYear} setUpdateButton={setUpdateButton} setDeleteWarning={setDeleteWarning} delArtistID={delArtistID} setDelArtistID={setDelArtistID} delIDs={delIDs} delIDsArt={delIDsArt}/>
       <AlbumResults  noData={noData} albums={albums} setNoData={setNoData} setAlbums={setAlbums}  deleteButton={deleteButton} setDeleteButton={setDeleteButton} updateButton={updateButton} setUpdateButton={setUpdateButton} updateAlbumYes={updateAlbumYes} deleteAlbumYes={deleteAlbumYes} upID={upID} upName={upName} upArtist={upArtist} upMaxListeners={upMaxListeners} upMinListeners={upMinListeners} upMaxYear={upMaxYear} upMinYear={upMinYear} upToName={upToName} upToArtist={upToArtist} upToListeners={upToListeners} upToYear={upToYear} deleteID={deleteID} delName={delName} delArtist={delArtist} delMinListeners={delMinListeners} delMaxListeners={delMaxListeners} delMinYear={delMinYear} delMaxYear={delMaxYear} deleteWarning={deleteWarning} setDeleteWarning={setDeleteWarning} upToArtistID={upToArtistID} delArtistID={delArtistID} IDs={IDs} setIDs={setIDs} setDelIDs={setDelIDs} delIDsArt={delIDsArt} setDelIDsArt={setDelIDsArt} upArtistID={upArtistID} setUpArtistID={setUpArtistID}/>
    </div>
    );
};



export default Albums;

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