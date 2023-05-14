const { ObjectId } = require('mongodb');
const ConnectDB = require('../db/connect');

const ListProductCollection = 'listproduct';

module.exports.ListProduct = class ListProduct {
    constructor(
        _id,
        IdProduct,
        ProductId,
        ProductName,
        FloorId,
        FloorName,
        Amount,
        ImportDate,
        Unit,
    ) {
        this._id = _id;
        this.IdProduct = IdProduct;
        this.ProductId = ProductId;
        this.ProductName = ProductName;
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

module.exports.Insert = async (product) => {
    try {
        let result = '';

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ListProductCollection);

        let check = await collection
            .find({ IdProduct: product.IdProduct, FloorId: product.FloorId })
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

module.exports.Update = async (product) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ListProductCollection);

        let result = await collection.updateMany(
            {
                _id: new ObjectId(product._id),
            },
            {
                $set: {
                    ProductId: product.ProductId,
                    ProductName: product.ProductName,
                    ImportDate: product.ImportDate,
                    Unit: product.Unit,
                    Amount: product.Amount,
                },
            },
        );

        Connect.disconnect();

        return result.modifiedCount;
    } catch (err) {
        console.log(err);
    }
};

module.exports.UpdateAmount = async (id, amount) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ListProductCollection);

        let result;

        if (amount <= 0) {
            result = await collection.deleteMany({ _id: new ObjectId(id) });

            result = result.deletedCount;
        } else {
            result = await collection.updateMany(
                {
                    _id: new ObjectId(id),
                },
                {
                    $set: {
                        Amount: amount,
                    },
                },
            );

            result = result.modifiedCount;
        }

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.Delete = async (id) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(ListProductCollection);

        let result = await collection.deleteMany({ _id: new ObjectId(id) });

        return result.deletedCount;
    } catch (err) {
        console.log(err);
    }
};
