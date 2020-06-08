const Post = require('../models').Post
const Category = require('../models').Category
const Tag = require('../models').Tag

module.exports = {
  async create(req, res) {
    try {
      const tag = await Tag.create({
        name: req.body.name
      })
      res.status(200).send(tag)
    } catch (e) {
      res.status(400).send({
        message: `error - ${e}`
      })
    }
  },

  async list(req, res) {
    try {
      const tags = await Tag.findAll({})
      res.status(200).send(tags)
    } catch (e) {
      res.status(400).send({
        message: `error - ${e}`
      })
    }
  },

  async get(req, res) {
    try {
      const tag = await Tag.findByPk(req.params.tagId, {})
      res.status(200).send(tag)
    } catch (e) {
      res.status(400).send({
        message: `Error - ${e}`
      })
    }
  },

  async update(req, res) {
    try {
      const tag = await Tag.findByPk(req.params.tagId, {})


      if (!tag) {
        return res.status(404).send({
          message: `Tag with ID ${req.params.tagId} not found`
        })
      }

      await Tag.update({
        name: req.body.name || tag.name,
      }, {
        where: {
          id: req.params.tagId
        }
      });

      const updatedTag = await Tag.findByPk(req.params.tagId, {})

      res.status(200).send(updatedTag)
    } catch (e) {
      res.status(400).send({
        message: `Error - ${e}`
      })
    }
  },

  async destroy(req, res) {
    try {
      const response = await Tag.destroy({
        where: {
          id: req.params.tagId
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
