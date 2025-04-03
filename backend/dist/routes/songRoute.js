const express = require('express');//import controller and stuff
const router = express.Router();
const songController = require('../controllers/songController');

// Routes for Songs
router.get('/getAllSongs', songController.getAllSongs);
router.get('/getSongs', songController.getSongs);
router.get('/createSongs', songController.createSongs);
router.get('/deleteSongs', songController.deleteSongs);
router.get('/updateSongs', songController.updateSongs);

module.exports = router;