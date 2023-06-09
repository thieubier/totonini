const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../../database/sqlite.db');
const menu_list = sequelize.define('menu_list', {
    menuList_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'menu_list',
    timestamps: false,
    indexes: []
  });
module.exports = menu_list
