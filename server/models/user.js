'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    token: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
    });
  };

  return User;
};
