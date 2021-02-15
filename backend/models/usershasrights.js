'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersHasRights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  UsersHasRights.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    rightId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: '2'
    },
  }, {
    sequelize,
    modelName: 'UsersHasRights',
  });
  return UsersHasRights;
};