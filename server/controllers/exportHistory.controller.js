const ExportHistoryModel = require('../models/exportHistory.model');

module.exports.GetListExportHistory = async (req, res) => {
    try {
        let result = await ExportHistoryModel.GetListExportHistory();

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.InsertExportHistory = async (req, res) => {
    try {
        let history = req.body;

        let result = await ExportHistoryModel.Insert(history);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};
