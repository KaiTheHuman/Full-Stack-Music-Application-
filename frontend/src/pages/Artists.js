import React, { useState} from "react";  //import react, states, and all artists components an subcomponents
import ArtistSearch from '../components/ArtistSearch';
import ArtistCreate from '../components/ArtistCreate';
import UpdateArtists from "../components/UpdateArtists";
import DeleteArtists from "../components/DeleteArtists";
import ArtistResults from "../components/ArtistResults";
import { updateArtistYes } from "../components/UpdateArtists";
import { deleteArtistYes } from "../components/DeleteArtists";


const Artists = () => {  
    const [artists, setArtists] = useState([]); //stores array of selected artists
    const [noData, setNoData] = useState('No artists found'); //this message dispalys if results are blank
    const [updateButton, setUpdateButton] = useState(false); //for a are you sure feature
    const [deleteButton, setDeleteButton] = useState(false);

    const [upName, setUpName] = useState('');   //Update values, up___ are for parameters and upTo___ are what theyre changing to
    const [upGenre, setUpGenre] = useState(''); //placed here for the are you sure feature, can be accessed by results and update function
    const [upMinListeners, setUpMinListeners] = useState('');
    const [upMaxListeners, setUpMaxListeners] = useState('');
    const [upID, setUpID] = useState('');
    const [upToName, setUpToName] = useState('');
    const [upToGenre, setUpToGenre] = useState('');
    const [upToListeners, setUpToListeners] = useState('');

        const [deleteID, setDeleteID] = useState(''); //delete values.
        const [delName, setDelName] = useState('');
        const [delGenre, setDelGenre] = useState('');
        const [delMinListeners, setDelMinListeners] = useState('');
        const [delMaxListeners, setDelMaxListeners] = useState('');
        const [deleteWarning, setDeleteWarning] = useState('');
  
    return (// all the components with the values they need.
        <div>
      <h1>Artists Page</h1> 
       <ArtistSearch setNoData={setNoData} setArtists={setArtists} setUpdateButton={setUpdateButton}  setDeleteButton={setDeleteButton} setDeleteWarning={setDeleteWarning}/> {/* Search Form */}
       <ArtistCreate setNoData={setNoData} setArtists={setArtists} setUpdateButton={setUpdateButton} setDeleteButton={setDeleteButton} setDeleteWarning={setDeleteWarning}/>{}
       <UpdateArtists setNoData={setNoData} setArtists={setArtists}  updateButton={updateButton} setUpdateButton={setUpdateButton} upID={upID} setUpID={setUpID} upName={upName} setUpName={setUpName} upGenre={upGenre} setUpGenre={setUpGenre} upMaxListeners={upMaxListeners} setUpMaxListeners={setUpMaxListeners} upMinListeners={upMinListeners} setUpMinListeners={setUpMinListeners} upToName={upToName} setUpToName={setUpToName} upToGenre={upToGenre} setUpToGenre={setUpToGenre} upToListeners={upToListeners} setUpToListeners={setUpToListeners} setDeleteButton={setDeleteButton} setDeleteWarning={setDeleteWarning}/>{}
       <DeleteArtists setNoData={setNoData} setArtists={setArtists}  setDeleteButton={setDeleteButton} deleteID={deleteID} setDeleteID={setDeleteID} delName={delName} setDelName={setDelName} delGenre={delGenre} setDelGenre={setDelGenre} delMinListeners={delMinListeners} setDelMinListeners={setDelMinListeners} delMaxListeners={delMaxListeners} setDelMaxListeners={setDelMaxListeners} setUpdateButton={setUpdateButton} setDeleteWarning={setDeleteWarning}/>
       <ArtistResults  noData={noData} artists={artists} setNoData={setNoData} setArtists={setArtists}  deleteButton={deleteButton} setDeleteButton={setDeleteButton} updateButton={updateButton} setUpdateButton={setUpdateButton} updateArtistYes={updateArtistYes} deleteArtistYes={deleteArtistYes} upID={upID} upName={upName} upGenre={upGenre} upMaxListeners={upMaxListeners} upMinListeners={upMinListeners} upToName={upToName} upToGenre={upToGenre} upToListeners={upToListeners} deleteID={deleteID} delName={delName} delGenre={delGenre} delMinListeners={delMinListeners} delMaxListeners={delMaxListeners} deleteWarning={deleteWarning} setDeleteWarning={setDeleteWarning} />
    </div>
    );
};



export default Artists;
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