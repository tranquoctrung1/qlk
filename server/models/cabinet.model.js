const ConnectDB = require('../db/connect');

const CabinetCollection = 'cabinets';

module.exports.Cabinet = class Cabinet {
    constructor(_id, Name, AmountFloor, IdStock, StockName) {
        this._id = _id;
        this.Name = Name;
        this.AmountFloor = AmountFloor;
        this.IdStock = IdStock;
        this.StockName = StockName;
    }
};

module.exports.GetCabinets = async () => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(CabinetCollection);

        let result = await collection.find().sort({ Name: 1 }).toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetCabinetByStockId = async (id) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(CabinetCollection);

        let result = await collection
            .find({ IdStock: id })
            .sort({ Name: 1 })
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};
