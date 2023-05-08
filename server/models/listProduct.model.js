const ConnectDB = require('../db/connect');

const ListProductCollection = 'listproduct';

module.exports.ListProduct = class ListProduct {
    constructor(_id, ProductId, FloorId, FloorName, Amount, ImportDate, Unit) {
        this._id = _id;
        this.ProductId = ProductId;
        this.FloorId = FloorId;
        this.FloorName = FloorName;
        this.Amount = Amount;
        this.ImportDate = ImportDate;
        this.Unit = Unit;
    }
};

module.exports.GetListProductByFloorId = async (id) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ListProductCollection);

        let result = await collection.find({ FloorId: id }).toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};
