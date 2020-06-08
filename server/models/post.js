'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Post.belongsToMany(models.Tag, {
      through: 'TagPosts',
      as: 'tags',
      foreignKey: 'postId'
    })
  };

  return Post;
};
