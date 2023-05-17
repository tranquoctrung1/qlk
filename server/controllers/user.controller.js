const UserModel = require('../models/user.model');

module.exports.GetUsers = async (req, res) => {
    try {
        let result = await UserModel.GetUsers();

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};

module.exports.InsertUser = async (req, res) => {
    try {
        let user = req.body;

        let result = await UserModel.Insert(user);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};

module.exports.UpdateUser = async (req, res) => {
    try {
        let user = req.body;

        let result = await UserModel.Update(user);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};

module.exports.DeleteUser = async (req, res) => {
    try {
        let { username } = req.query;

        let result = await UserModel.Delete(username);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};
