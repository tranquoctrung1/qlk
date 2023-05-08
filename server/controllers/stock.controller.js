const StockModel = require('../models/stock.model');

module.exports.GetStocks = async (req, res) => {
    try {
        let result = await StockModel.GetStocks();

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};
