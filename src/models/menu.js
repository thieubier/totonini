const {DataTypes} = require('sequelize');
const {sequelize} = require('../../database/sqlite.db');
const menu = sequelize.define('menu', {
    menu_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    plat: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    boisson: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'menu',
    timestamps: false,
    indexes: []
  });
module.exports = menu