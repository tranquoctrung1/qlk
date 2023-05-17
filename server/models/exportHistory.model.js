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
        Price,
        TotalPrice,
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
        this.Price = Price;
        this.TotalPrice = TotalPrice;
    }
};

module.exports.GetListExportHistory = async () => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ExportHistoryCollection);

        let result = await collection
            .find()
            .sort({ ExportDate: -1 })
            .limit(100)
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetListExportHistoryByTimeStamp = async (start, end) => {
    try {
        let startDate = new Date(parseInt(start));

        let endDate = new Date(parseInt(end));

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ExportHistoryCollection);

        let result = await collection
            .find({ ExportDate: { $gte: startDate, $lte: endDate } })
            .sort({ ExportDate: -1 })
            .toArray();

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

        history.ExportDate = new Date(history.ExportDate);
        result = await collection.insertOne(history);
        result = result.insertedId;

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};
