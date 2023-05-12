const ListProductModel = require('../models/listProducts.model');

module.exports.GetListProductByFloorId = async (req, res) => {
    try {
        let { id } = req.query;

        let result = await ListProductModel.GetListProductByFloorId(id);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};

module.exports.InsertListProduct = async (req, res) => {
    try {
        let product = req.body;

        let result = await ListProductModel.Insert(product);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.UpdateListProduct = async (req, res) => {
    try {
        let product = req.body;

        let result = await ListProductModel.Update(product);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.DeleteListProduct = async (req, res) => {
    try {
        let { id } = req.query;

        let result = await ListProductModel.Delete(id);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};
