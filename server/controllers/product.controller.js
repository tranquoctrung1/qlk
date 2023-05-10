const ProductModel = require('../models/product.model');
const ImportHistoryModel = require('../models/importHistory.model');

module.exports.Insert = async (req, res) => {
    try {
        let product = req.body;

        let result = await ProductModel.Insert(product);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};

module.exports.GetProducts = async (req, res) => {
    try {
        let result = await ProductModel.GetProducts();

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.Update = async (req, res) => {
    try {
        let product = req.body;

        let result = await ProductModel.Update(product);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};

module.exports.Delete = async (req, res) => {
    try {
        let { id } = req.query;

        let result = await ProductModel.Delete(id);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};
