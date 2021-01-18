'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany( models.Right, { through: models.UsersHasRights, as: 'rights' } );
      // User.hasMany( models.Post, { as: 'posts' } );
    }
  };
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    email : { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    username : { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 20],
      }
    },
    password : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: DataTypes.STRING,
  }, 
  {
    hooks: {
    },
    defaultScope: {
        attributes: { exclude: [
          'createdAt',
          'updatedAt',
          'password'
        ] },
    },
    scopes: {
      withPassword: {
        attributes: { exclude: [ 'createdAt', 'updatedAt', 'bio' ] },
      }
    },
    modelName: 'User',
    sequelize
  });
  return User;
};