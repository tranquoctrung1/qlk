const express = require('express');
const router = express.Router();

const ListProductController = require('../controllers/listProduct.controller');

router.get(
    '/GetListProductByFloorId',
    ListProductController.GetListProductByFloorId,
);
router.post('/InsertListProduct', ListProductController.InsertListProduct);

router.patch('/UpdateListProduct', ListProductController.UpdateListProduct);

router.delete('/DeleteListProduct', ListProductController.DeleteListProduct);

module.exports = router;
