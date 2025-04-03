const db = require('../../db.js'); //import database connection, needed to execute queries.

//-----------------------SEARCH FUNTIONS-----------------------------------------

const getAllArtists= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const result= await db.query('SELECT * FROM artists'); //try getting all users. await= wait for query to finish before next step
    console.log(result);
    res.json(result); //send result back as a JSON
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

const getArtists= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {name,id, genre, min_listeners, max_listeners} = req.query; //get parameters
    let query = 'SELECT * FROM artists WHERE 1=1'; //start query string 
    let queryParams = [];

    if(id){ //add variables if they exist
      query += ' AND id = ?';
      queryParams.push(parseInt(id));
    }

    if(name){
      query += ' AND artist_name = ?';
      queryParams.push(name);
    }

    if(genre){
      query += ' AND genre = ?';
      queryParams.push(genre);
    }

    if(min_listeners){
      query += ' AND monthly_listeners >= ?';
      queryParams.push(parseInt(min_listeners));
    }
    if(max_listeners){
      query += ' AND monthly_listeners <= ?';
      queryParams.push(parseInt(max_listeners));
    }
    console.log(query);
    console.log(name);

    const result = await db.query(query, queryParams); //sends request
    res.json(result); //send results back as a JSON file
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

//-------------------------------CREATE---------------------------------------

const createArtists= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {newName, newGenre, listener_count} = req.query; //get variables
    if(!newName){ //if no name send back
      res.json("No name");
    }
    else{
    let query = 'INSERT INTO `artists` (`artist_name`';
    let queryParams = [];

    if(newGenre){ //if vaiables exist add them
      query += ', `genre`';
    }
    if(listener_count)
    {
      query += ', `monthly_listeners`) VALUES'
    }
    else{
      query += ') VALUES'
    }

  
      query += " (? ";
      queryParams.push(newName);
    

    if(newGenre){
      query += " ,? ";
      queryParams.push(newGenre);
    }

    if(listener_count){
      query += " ,?) ";
      queryParams.push(parseInt(listener_count));
    }
    else{
      query += " ) ";
    }

    console.log(query);
    console.log(newName);

    const result = await db.query(query, queryParams); //sends request
    console.log(result);
    console.log(result.data);
    res.json(result); //send back result
  }
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

//-----------------------------DELETE---------------------------------------------

const deleteArtists= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id, delName, delGenre, min_listeners, max_listeners} = req.query; //get vairiables
    let query = 'Delete FROM `artists` WHERE';
    let queryParams = [];
    let conditions =[];

    if(id){ //add variables if they exist
      conditions.push(' id = ?');
      queryParams.push(parseInt(id));
    }
    if(delName){
      conditions.push(' artist_name = ?');
      queryParams.push(delName);
    }

    if(delGenre){
      conditions.push(' genre = ?');
      queryParams.push(delGenre);
    }

    if(min_listeners){
      conditions.push(' monthly_listeners >= ?');
      queryParams.push(parseInt(min_listeners));
    }
    if(max_listeners){
      conditions.push(' monthly_listeners <= ?');
      queryParams.push(parseInt(max_listeners));
    }

    query += conditions.join(' AND'); //join puts the word AND between eatch condition. 
    console.log(query);

      const [album] = await db.query('SELECT album_list FROM artists WHERE id = ?', id) //see if theres any albums connected to artist
      if(album)
      {
         await db.query('UPDATE Albums SET artist = NULL WHERE artist = ?', [ id]) //delete artistid from album 
      }


    const result = await db.query(query, queryParams); //send request
    console.log(result);
    console.log(result.data);
    res.json(result); //send result
  }
   catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

//----------------------------------------------UPDATE------------------------------------------------------------

const updateArtists= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id, upName, upGenre, min_listeners, max_listeners, upToName, upToGenre, upToListeners} = req.query;
    let query = 'UPDATE `artists` SET ';
    let queryParams = [];
    let updateFields = [];

    if(upToName){ //Update TO varaibles first added if they exist
      updateFields.push('`artist_name` = ?');
      queryParams.push(upToName);
    }
    if(upToGenre){
      updateFields.push('`genre` = ?');
      queryParams.push(upToGenre);
    }

    if(upToListeners){
      updateFields.push('`monthly_listeners` = ?');
      queryParams.push(parseInt(upToListeners));
    }

    if (updateFields.length > 0) {
      query += updateFields.join(', ') + ' '; // Join the update fields with commas
    } 

    query+=" WHERE 1 = 1 " //paramter variables added now

    if(id){
      query += ' AND `id` = ?';
      queryParams.push(parseInt(id));
    }
    if(upName){
      query += ' AND `artist_name` = ?';
      queryParams.push(upName);
    }

    if(upGenre){
      query += ' AND `genre` = ?';
      queryParams.push(upGenre);
    }

    if(min_listeners){
      query += ' AND `monthly_listeners` >= ?';
      queryParams.push(parseInt(min_listeners));
    }
    if(max_listeners){
      query += ' AND `monthly_listeners` <= ?';
      queryParams.push(parseInt(max_listeners));
    }
    console.log(query);


    const result = await db.query(query, queryParams);
    console.log(result);
    console.log(result.data);
    res.json(result);
  }
   catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { //export everything
    getAllArtists,
    getArtists,
    createArtists,
    deleteArtists,
    updateArtists,
  };




