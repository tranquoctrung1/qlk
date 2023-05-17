const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.Login = async (req, res) => {
    try {
        let UserName = req.body.UserName;
        let Password = req.body.Password;

        let result = await UserModel.GetUserByUserName(UserName);

        if (result.length > 0) {
            let dbPassword = result[0].Password;
            if (bcrypt.compareSync(Password, dbPassword)) {
                let token = jwt.sign(
                    {
                        username: result[0].UserName,
                        userid: result[0]._id,
                        role: result[0].Role,
                    },
                    process.env.JWT_KEY,
                    //{ expiresIn: "1h" }
                );

                res.status(200).json({
                    username: result[0].UserName,
                    Role: result[0].Role,
                    token: token,
                });
            } else {
                res.status(200).json({
                    error: 'Tài khoảng hoặc mật khẩu sai!!',
                });
            }
        } else {
            res.status(200).json({ error: 'Tài khoảng hoặc mật khẩu sai!!' });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};
