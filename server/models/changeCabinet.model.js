const ConnectDB = require('../db/connect');

const ChangeCabinetHistoryCollection = 'changecabinethistory';

module.exports.ChangeCabinetHistory = class ChangeCabinetHistory {
    constructor(
        _id,
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
        ImportDate,
    ) {
        this._id = _id;
        this.ProductId = ProductId;
        this.ProductName = ProductName;
        this.FloorId = FloorId;
        this.FloorName = FloorName;
        this.CabinetId = CabinetId;
        this.CabinetIdName = CabinetName;
        this.StockId = StockId;
        this.StockName = StockName;
        this.Amount = Amount;
        this.ImportDate = ImportDate;
        this.Unit = Unit;
    }
};

module.exports.GetListChangeCabinetHistory = async () => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ChangeCabinetHistoryCollection);

        let result = await collection.find().sort({ ImportDate: -1 }).toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};
