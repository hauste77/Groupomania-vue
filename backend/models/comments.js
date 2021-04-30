'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
   
    static associate(models) {
      Comment.belongsTo( models.User, { as: 'user' } );
      Comment.belongsTo( models.Post, { as: 'post' } );
    }
  };
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 250]
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};