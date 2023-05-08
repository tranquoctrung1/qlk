const express = require('express');
const router = express.Router();

const StockController = require('../controllers/stock.controller');

router.get('/GetStocks', StockController.GetStocks);

module.exports = router;
