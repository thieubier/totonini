const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../../database/sqlite.db');
const users = sequelize.define('users', {
    user_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.CHAR(50),
        allowNull: true
    },
    password: {
        type: DataTypes.CHAR(20),
        allowNull: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                {name: "user_id"},
            ]
        },
        {
            name: "user_id",
            unique: true,
            using: "BTREE",
            fields: [
                {name: "user_id"},
            ]
        },
    ]
});
module.exports = users