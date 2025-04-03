const express = require('express');  //import controller and stuff
const router = express.Router();
const albumController = require('../controllers/albumController');

// Routes for albums
router.get('/getAllAlbums', albumController.getAllAlbums);
router.get('/getAlbums', albumController.getAlbums);
router.get('/createAlbums', albumController.createAlbums);
router.get('/deleteAlbums', albumController.deleteAlbums);
router.get('/updateAlbums', albumController.updateAlbums);

module.exports = router;