const express = require('express');//import controller and stuff
const router = express.Router();
const artistController = require('../controllers/artistController');

// Routes for artists
router.get('/getAllArtists', artistController.getAllArtists);
router.get('/getArtists', artistController.getArtists);
router.get('/createArtists', artistController.createArtists);
router.get('/deleteArtists', artistController.deleteArtists);
router.get('/updateArtists', artistController.updateArtists);

module.exports = router;