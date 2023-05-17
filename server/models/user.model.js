const ConnectDB = require('../db/connect');
const bcrypt = require('bcryptjs');

const UserCollection = 'users';

module.exports.User = class User {
    constructor(_id, UserName, Password, Name, Role) {
        this._id = _id;
        this.UserName = UserName;
        this.Password = Password;
        this.Name = Name;
        this.Role = Role;
    }
};

module.exports.GetUsers = async () => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(UserCollection);

        let result = await collection.find().sort({ UserName: 1 }).toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetUserByUserName = async (username) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(UserCollection);

        let result = await collection
            .find({ UserName: username })
            .sort({ UserName: 1 })
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.Insert = async (user) => {
    try {
        let result = '';

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(UserCollection);

        let check = await collection
            .find({ UserName: user.UserName })
            .toArray();

        if (check.length <= 0) {
            let salt = bcrypt.genSaltSync(parseInt(process.env.GEN_SALT || 10));
            let password = bcrypt.hashSync(user.Password, salt);

            user.Password = password;

            result = await collection.insertOne(user);
            result = result.insertedId;
        }

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.Update = async (user) => {
    try {
        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(UserCollection);

        let salt = bcrypt.genSaltSync(parseInt(process.env.GEN_SALT || 10));
        let password = bcrypt.hashSync(user.Password, salt);

        user.Password = password;

        let result = await collection.updateMany(
            {
                UserName: user.UserName,
            },
            {
                $set: {
                    UserName: user.UserName,
                    Password: user.Password,
                    Name: user.Name,
                    Role: user.Role,
                },
            },
        );

        Connect.disconnect();

        return result.modifiedCount;
    } catch (err) {
        console.log(err);
    }
};

module.exports.Delete = async (username) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(UserCollection);

    console.log(username);

    let result = await collection.deleteMany({ UserName: username });

    Connect.disconnect();

    return result.deletedCount;
};
