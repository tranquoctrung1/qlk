const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller');

router.post('/InsertProduct', ProductController.Insert);
router.get('/GetProducts', ProductController.GetProducts);

module.exports = router;
