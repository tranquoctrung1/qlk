const express = require('express');
const router = express.Router();

const ExchangeHistoryController = require('../controllers/exchangeHistory.controller');

router.get(
    '/GetListExchangeHistory',
    ExchangeHistoryController.GetExchangeHistory,
);

router.get(
    '/GetListExchangeHistoryByTimeStamp',
    ExchangeHistoryController.GetListExchangeHistoryByTimeStamp,
);

router.post(
    '/InsertExchangeHistory',
    ExchangeHistoryController.InsertExchangeHistory,
);

module.exports = router;
