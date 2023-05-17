const ExportHistoryModel = require('../models/exportHistory.model');
const ProductModel = require('../models/product.model');

module.exports.GetListExportHistory = async (req, res) => {
    try {
        let result = await ExportHistoryModel.GetListExportHistory();

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.GetListExportHistoryByTimeStamp = async (req, res) => {
    try {
        let { start, end } = req.query;

        let result = await ExportHistoryModel.GetListExportHistoryByTimeStamp(
            start,
            end,
        );

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.InsertExportHistory = async (req, res) => {
    try {
        let history = req.body;

        let product = await ProductModel.GetProductByProductId(
            history.IdProduct,
        );

        if (product.length > 0) {
            history.Price = product[0].Price;
        } else {
            history.Price = 0;
        }

        history.TotalPrice = history.Amount * history.Price;

        let result = await ExportHistoryModel.Insert(history);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};
