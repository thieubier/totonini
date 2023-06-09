const {DataTypes} = require('sequelize');
const {sequelize} = require('../../database/sqlite.db');
const commande = sequelize.define('commande', {
    commande_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    menu_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // Utilisation du type de données ARRAY pour stocker une liste d'ID de menu
        allowNull: true
    }
  }, {
    sequelize,
    tableName: 'commande',
    timestamps: false
  });
module.exports = commande
