const User = require('../models').User
const Post = require('../models').Post
const Tag = require('../models').Tag
const TagPost = require('../models').TagPost

module.exports = {
  async create(req, res) {
    try {
      const post = await Post.create({
        title: req.body.title,
        body: req.body.body,
        categoryId: req.body.categoryId,
        userId: req.params.userId
      })

      for (let i = 0; i < req.body.tagIds.length; i++) {
        let id = req.body.tagIds[i]
        const tag = await Tag.findByPk(id, {})
        if (!tag) {
          return res.status(404).send({
            message: `Tag with ID ${id} does not exist`
          })
        }
        const json = {
          tagId: id,
          postId: post.id
        }
        const tagPost = TagPost.create(json, {})
      }

      res.status(200).send(post)
    } catch (e) {
      res.status(400).send({
        message: `error - ${e}`
      })
    }
  },

  async list(req, res) {
    try {
      const usersPosts = await Post.findAll({
        where: {
          userId: req.params.userId
        }
      })

      if (usersPosts.length === 0) {
        return res.status(404).send({
          message: `User with ID ${req.params.userId} hasn't written any posts!`
        })
      }

      res.status(200).send(usersPosts)
    } catch (e) {
      res.status(400).send({
        message: `Error - ${e}`
      })
    }
  },

  async get(req, res) {
    try {
      const post = await Post.findByPk(req.params.postId, {
        include: [
          {
            model: User,
          },
          {
            model: Tag,
            as: 'tags',
            through: {
              model: TagPost,
              as: 'tagposts'
            }
          }
        ]
      })

      if (!post) {
        return res.status(404).send({
          message: `Post with ID ${req.params.postId} not found`
        })
      }

      res.status(200).send(post)
    } catch (e) {
      res.status(400).send({
        message: `Error - ${e}`
      })
    }
  },

  async update(req, res) {
    try {
      const post = await Post.findByPk(req.params.postId, {
        include: [{
          model: User
        }],
      })

      await Post.update({
        title: req.body.title || post.title,
        body: req.body.body || post.body
      }, {
        where: {
          id: req.params.postId
        }
      });

      const updatedPost = await Post.findByPk(req.params.postId, {
        include: [{
          model: User
        }],
      })

      res.status(200).send(updatedPost)
    } catch (e) {
      res.status(400).send({
        message: `Error - ${e}`
      })
    }
  },

  async destroy(req, res) {
    try {
      const response = await Post.destroy({
        where: {
          id: req.params.postId
        }
      })

      res.sendStatus(200).send(response)
    } catch (e) {
      res.status(400).send({
        message: `Error - ${e}`
      })
    }
  },
}
