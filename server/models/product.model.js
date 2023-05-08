const ConnectDB = require('../db/connect');

const ProductCollection = 'products';

module.exports.Product = class Product {
    constructor(_id, ProductID, Name, ImportDate, Unit, BaseAlarm) {
        this._id = _id;
        this.Name = Name;
        this.ProductID = ProductID;
        this.ImportDate = ImportDate;
        this.Unit = Unit;
        this.BaseAlarm = BaseAlarm;
    }
};

module.exports.GetProducts = async () => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ProductCollection);

        let result = await collection.find().sort({ Name: 1 }).toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetProductByProductId = async (id) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ProductCollection);

        let result = await collection
            .find({ ProductID: id })
            .sort({ Name: 1 })
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.Insert = async (product) => {
    try {
        let result = '';

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ProductCollection);

        let check = await collection
            .find({ ProductID: product.ProductID })
            .toArray();

        if (check.length <= 0) {
            result = await collection.insertOne(product);
            result = result.insertedId;
        }

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};
