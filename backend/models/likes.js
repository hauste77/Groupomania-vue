'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    
    static associate(models) {
    }
  };
  Likes.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    // like: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};