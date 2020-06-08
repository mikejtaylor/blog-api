const User = require('../models').User
const Post = require('../models').Post

module.exports = {
  async create(req, res) {
    try {
      const user = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname
      })
      res.status(200).send(user)
    } catch (e) {
      res.status(400).send({
        message: `Error - ${e}`
      })
    }
  },

  async get(req, res) {
    try {
      const user = await User.findByPk(req.params.userId, {
        include: [{
          model: Post,
          as: 'posts'
        }],
      })

      if (!user) {
        return res.status(404).send({
          message: `User with ID ${req.params.userId} not found`
        })
      };

      res.status(200).send(user)
    } catch (e) {
      res.status(400).send({
        message: `Error - ${e}`
      })
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.userId, {
        include: [{
          model: Post,
          as: 'posts'
        }],
      })

      await User.update({
        firstname: req.body.firstname || user.firstname,
        lastname: req.body.lastname || user.lastname
      }, {
        where: {
          id: req.params.userId
        }
      });

      const updatedUser = await User.findByPk(req.params.userId, {
        include: [{
          model: Post,
          as: 'posts'
        }],
      })

      res.status(200).send(updatedUser)
    } catch (e) {
      res.status(400).send({
        message: `Error - ${e}`
      })
    }
  },

  async destroy(req, res) {
    try {
      const response = await User.destroy({
        where: {
          id: req.params.userId
        }
      })

      res.sendStatus(200).send(response)
    } catch (e) {
      res.status(400).send({
        message: `Error - ${e}`
      })
    }
  }
}
