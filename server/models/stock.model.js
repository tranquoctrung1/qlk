const ConnectDB = require('../db/connect');

const StockCollection = 'stocks';

module.exports.Stocks = class Stocks {
    constructor(_id, Name, Address) {
        this._id = _id;
        this.Name = Name;
        this.Address = Address;
    }
};

module.exports.GetStocks = async () => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(StockCollection);

        let result = await collection.find().sort({ Name: 1 }).toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};
