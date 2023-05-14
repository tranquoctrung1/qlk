const express = require('express');
const router = express.Router();

const ExportHistoryController = require('../controllers/exportHistory.controller');

router.get(
    '/GetListExportHistory',
    ExportHistoryController.GetListExportHistory,
);
router.post(
    '/InsertExportHistory',
    ExportHistoryController.InsertExportHistory,
);

module.exports = router;
