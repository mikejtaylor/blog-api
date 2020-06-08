'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {});
  Tag.associate = (models) => {
    Tag.belongsToMany(models.Post, {
      through: 'TagPosts',
      as: 'posts',
      foreignKey: 'tagId'
    })
  };
  return Tag;
};
