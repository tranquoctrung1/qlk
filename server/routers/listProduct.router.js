const express = require('express');
const router = express.Router();

const ListProductController = require('../controllers/listProduct.controller');

router.get(
    '/GetListProductByStockId',
    ListProductController.GetListProductByStockId,
);

router.get(
    '/GetListProductByFloorId',
    ListProductController.GetListProductByFloorId,
);

router.get(
    '/GetListProductByCabinetId',
    ListProductController.GetListProductByCabinetId,
);

router.post('/InsertListProduct', ListProductController.InsertListProduct);

router.patch('/UpdateListProduct', ListProductController.UpdateListProduct);

router.patch(
    '/UpdateAmountListProduct',
    ListProductController.UpdateAmountListProduct,
);

router.delete('/DeleteListProduct', ListProductController.DeleteListProduct);

router.post(
    '/InsertOrUpdateProductToListProduct',
    ListProductController.InsertOrUpdateProductToListProduct,
);

module.exports = router;
