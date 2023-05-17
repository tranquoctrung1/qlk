const ConnectDB = require('../db/connect');

const ExchangeHistoryCollection = 'exchangehistory';

module.exports.Cabinet = class Cabinet {
    constructor(
        _id,
        IdFromStock,
        FromStockName,
        IdFromCabinet,
        FromCabinetName,
        IdFromFloor,
        FromFloorName,
        IdProduct,
        ProductId,
        ProductName,
        Amount,
        IdToStock,
        ToStockName,
        IdToCabinet,
        ToCabinetName,
        IdToFloor,
        ToFloorName,
        ExchangeDate,
        Unit,
    ) {
        this._id = _id;
        this.IdFromStock = IdFromStock;
        this.FromStockName = FromStockName;
        this.IdFromCabinet = IdFromCabinet;
        this.FromCabinetName = FromCabinetName;
        this.IdFromFloor = IdFromFloor;
        this.FromFloorName = FromFloorName;
        this.IdProduct = IdProduct;
        this.ProductId = ProductId;
        this.ProductName = ProductName;
        this.Amount = Amount;
        this.IdToStock = IdToStock;
        this.ToStockName = ToStockName;
        this.IdToCabinet = IdToCabinet;
        this.ToCabinetName = ToCabinetName;
        this.IdToFloor = IdToFloor;
        this.ToFloorName = ToFloorName;
        this.ExchangeDate = ExchangeDate;
        this.Unit = Unit;
    }
};

module.exports.GetExchangeHistory = async () => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ExchangeHistoryCollection);

        let result = await collection
            .find()
            .sort({ ExchangeDate: -1 })
            .limit(200)
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetListExchangeHistoryByTimeStamp = async (start, end) => {
    try {
        let startDate = new Date(parseInt(start));

        let endDate = new Date(parseInt(end));

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ExchangeHistoryCollection);

        let result = await collection
            .find({ ExchangeDate: { $gte: startDate, $lte: endDate } })
            .sort({ ExchangeDate: -1 })
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.Insert = async (history) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ExchangeHistoryCollection);

        history.ExchangeDate = new Date(history.ExchangeDate);
        result = await collection.insertOne(history);
        result = result.insertedId;

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};
