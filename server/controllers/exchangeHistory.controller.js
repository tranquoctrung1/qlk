const ExchangeHistoryModel = require('../models/exchangeHistory.model');

module.exports.GetExchangeHistory = async (req, res) => {
    try {
        let result = await ExchangeHistoryModel.GetExchangeHistory();

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};

module.exports.GetListExchangeHistoryByTimeStamp = async (req, res) => {
    try {
        let { start, end } = req.query;

        let result =
            await ExchangeHistoryModel.GetListExchangeHistoryByTimeStamp(
                start,
                end,
            );

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};

module.exports.InsertExchangeHistory = async (req, res) => {
    try {
        let history = req.body;

        let result = await ExchangeHistoryModel.Insert(history);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};
