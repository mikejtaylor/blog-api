'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {});
  Category.associate = (models) => {
    Category.hasMany(models.Post, {
      foreignKey: 'categoryId',
      as: 'posts',
    })
  };
  return Category;
};
