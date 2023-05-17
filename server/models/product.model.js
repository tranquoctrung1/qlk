const { ObjectId } = require('mongodb');
const ConnectDB = require('../db/connect');

const ProductCollection = 'products';

module.exports.Product = class Product {
    constructor(_id, ProductID, Name, ImportDate, Unit, BaseAlarm, Price) {
        this._id = _id;
        this.Name = Name;
        this.ProductID = ProductID;
        this.ImportDate = ImportDate;
        this.Unit = Unit;
        this.BaseAlarm = BaseAlarm;
        this.Price = Price;
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
            .find({ _id: new ObjectId(id) })
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
            product.ImportDate = new Date(product.ImportDate);

            result = await collection.insertOne(product);
            result = result.insertedId;
        }

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.Update = async (product) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ProductCollection);

        let result = await collection.updateMany(
            {
                _id: new ObjectId(product._id),
            },
            {
                $set: {
                    Name: product.Name,
                    ProductID: product.ProductID,
                    ImportDate: new Date(product.ImportDate),
                    Unit: product.Unit,
                    BaseAlarm: product.BaseAlarm,
                    Price: product.Price,
                },
            },
        );

        Connect.disconnect();

        return result.modifiedCount;
    } catch (err) {
        console.log(err);
    }
};

module.exports.Delete = async (id) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ProductCollection);

        let result = await collection.deleteMany({ _id: new ObjectId(id) });

        return result.deletedCount;
    } catch (err) {
        console.log(err);
    }
};
