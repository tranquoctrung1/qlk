const ConnectDB = require('../db/connect');

const ImportHistoryCollection = 'importhistory';

module.exports.ImportHistory = class ImportHistory {
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
        ExportDate,
        Content,
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
        this.ExportDate = ExportDate;
        this.Unit = Unit;
        this.Content = Content;
    }
};

module.exports.GetListImportHistory = async () => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ImportHistoryCollection);

        let result = await collection.find().sort({ ExportDate: -1 }).toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};
