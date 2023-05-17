const express = require('express');
const router = express.Router();

const CabinetController = require('../controllers/cabinet.controller');

router.get('/GetCabinets', CabinetController.GetCabinets);

module.exports = router;
