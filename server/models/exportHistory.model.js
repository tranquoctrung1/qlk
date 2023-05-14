const ConnectDB = require('../db/connect');

const ExportHistoryCollection = 'exporthistory';

module.exports.ExportHistory = class ExportHistory {
    constructor(
        _id,
        IdProduct,
        ProductId,
        ProductName,
        FloorId,
        FloorName,
        CabinetId,
        CabinetName,
        StockId,
        StockName,
        Amount,
        Unit,
        ExportDate,
    ) {
        this._id = _id;
        this.IdProduct = IdProduct;
        this.ProductId = ProductId;
        this.ProductName = ProductName;
        this.FloorId = FloorId;
        this.FloorName = FloorName;
        this.CabinetId = CabinetId;
        this.CabinetName = CabinetName;
        this.StockId = StockId;
        this.StockName = StockName;
        this.Amount = Amount;
        this.ExportDate = ExportDate;
        this.Unit = Unit;
    }
};

module.exports.GetListExportHistory = async () => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ExportHistoryCollection);

        let result = await collection.find().sort({ ExportDate: -1 }).toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.Insert = async (history) => {
    try {
        let result = '';

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ExportHistoryCollection);

        let check = await collection
            .find({ FloorId: history.FloorId, IdProduct: history.IdProduct })
            .toArray();

        if (check.length <= 0) {
            result = await collection.insertOne(history);
            result = result.insertedId;
        }

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};
