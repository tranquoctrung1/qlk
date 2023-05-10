const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller');

router.post('/InsertProduct', ProductController.Insert);
router.get('/GetProducts', ProductController.GetProducts);
router.patch('/UpdateProduct', ProductController.Update);
router.delete('/DeleteProduct', ProductController.Delete);

module.exports = router;
