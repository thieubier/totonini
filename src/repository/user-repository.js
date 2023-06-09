const uuid = require('uuid');
const User = require('../models/users')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12);

exports.getUsers = async () => await User.findAll();

exports.getUserByUsername =  (username) => {
    console.log("getUserByUsername console")
    return  User.findOne({ where : {username} });
};
exports.createUser = async (body) => {
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    const user = body;
    user.id = uuid.v4();
    user.password = hashedPassword;
    await User.create(user);
};

exports.updateUser = async (id, data) => {
    const foundUser = await User.findOne({ where : { user_id:id } });

    if (!foundUser) {
        throw new Error('User not found');
    }

    await User.update({username: data.username, password: bcrypt.hashSync(data.password, salt)}, {
        where: {id}
    });

    foundUser.username = data.username || foundUser.username;
    if (bcrypt.compareSync(body.password, hash)) {
        foundUser.password = bcrypt.hashSync(body.password, salt);
    }

    exports.deleteUser = async (id) => {
        await User.destroy({ where : { id }});
    }
}
