const ListProductModel = require('../models/listProducts.model');
const FloorModel = require('../models/floor.model');

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

module.exports.UpdateAmountListProduct = async (req, res) => {
    try {
        let { id, amount } = req.body;

        let result = await ListProductModel.UpdateAmount(id, amount);

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

module.exports.GetListProductByCabinetId = async (req, res) => {
    try {
        let { id } = req.query;

        let result = [];

        let floors = await FloorModel.GetFloorByCabinetId(id);

        if (floors.length > 0) {
            for (let floor of floors) {
                let obj = {};
                obj.FloorId = floor._id;
                obj.FloorName = floor.Name;

                let listProducts =
                    await ListProductModel.GetListProductByFloorId(
                        floor._id.toString(),
                    );

                obj.ListProduct = listProducts;

                result.push(obj);
            }
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};
