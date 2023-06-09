const menus = require("../models/menu");
const users = require("../models/users");

exports.populateMenu = async (json) => {
    return await menus.bulkCreate(json);
};

exports.populateUsers = async (json) => {
    return await users.bulkCreate(json);
};
