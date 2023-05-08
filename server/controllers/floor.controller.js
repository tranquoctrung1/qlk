const FloorModel = require('../models/floor.model');

module.exports.GetFloorByCabinetId = async (req, res) => {
    try {
        let { id } = req.query;

        let result = await FloorModel.GetFloorByCabinetId(id);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};
