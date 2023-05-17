const CabinetModel = require('../models/cabinet.model');

module.exports.GetCabinets = async (req, res) => {
    try {
        let result = await CabinetModel.GetCabinets();

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};
