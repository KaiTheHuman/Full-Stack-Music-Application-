
const express = require('express'); //import express
const cors = require('cors'); //prevents cors errors
const artistRoutes = require('./routes/artistRoute'); //import all our routes
const albumRoutes = require('./routes/albumRoute');
const songRoutes = require('./routes/songRoute');
const app = express(); // create express app

app.use(cors());
app.use(express.json());

app.use('/artists', artistRoutes); //use Routes when user uses axios with /___
app.use('/albums', albumRoutes);
app.use('/songs', songRoutes);

app.listen(3000, () => { //set up port
  console.log('Server is running on port 3000');
});