const Post = require('../models').Post
const Category = require('../models').Category

module.exports = {
  async create(req, res) {
    try {
      const category = await Category.create({
        name: req.body.name
      })
      res.status(200).send(category)
    } catch (e) {
      res.status(400).send({
        message: `error - ${e}`
      })
    }
  },

  async list(req, res) {
    try {
      const categories = await Category.findAll({})
      res.status(200).send(categories)
    } catch (e) {
      res.status(400).send({
        message: `error - ${e}`
      })
    }
  },

  async get(req, res) {
    try {
      const category = await Category.findByPk(req.params.categoryId, {
        include: [{
          model: Post,
          as: 'posts'
        }]
      })
      res.status(200).send(category)
    } catch (e) {
      res.status(400).send({
        message: `Error - ${e}`
      })
    }
  },

  async update(req, res) {
    try {
      const category = await Category.findByPk(req.params.categoryId, {})


      if (!category) {
        return res.status(404).send({
          message: `Category with ID ${req.params.categoryId} not found`
        })
      }

      await Category.update({
        name: req.body.name || category.name,
      }, {
        where: {
          id: req.params.categoryId
        }
      });

      const updatedCategory = await Category.findByPk(req.params.categoryId, {})

      res.status(200).send(updatedCategory)
    } catch (e) {
      res.status(400).send({
        message: `Error - ${e}`
      })
    }
  },

  async destroy(req, res) {
    try {
      const response = await Category.destroy({
        where: {
          id: req.params.categoryId
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
