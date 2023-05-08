const ConnectDB = require('../db/connect');

const FloorCollection = 'floors';

module.exports.Floor = class Floor {
    constructor(_id, Name, IdCabinet, NameCabinet) {
        this._id = _id;
        this.Name = Name;
        this.IdCabinet = IdCabinet;
        this.NameCabinet = NameCabinet;
    }
};

module.exports.GetFloors = async () => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(FloorCollection);

        let result = await collection.find().sort({ Name: 1 }).toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetFloorByCabinetId = async (id) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(FloorCollection);

        let result = await collection
            .find({ IdCabinet: id })
            .sort({ Name: 1 })
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};
