const express = require('express');
const router = express.Router();

const FloorController = require('../controllers/floor.controller');

router.get('/GetFloorByCabinetId', FloorController.GetFloorByCabinetId);

module.exports = router;
