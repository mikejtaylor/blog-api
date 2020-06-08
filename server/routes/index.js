const postsController = require('../controllers').posts;
const usersController = require('../controllers').users;
const categoriesController = require('../controllers').categories;
const tagsController = require('../controllers').tags;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to my blogs api!',
  }));

// User Routes
  app.post('/api/users', usersController.create);
  app.put('/api/users/:userId', usersController.update);
  app.get('/api/users/:userId', usersController.get);
  app.delete('/api/users/:userId', usersController.destroy);
// Post Routes
  app.post('/api/users/:userId/posts', postsController.create);
  app.put('/api/users/:userId/posts/:postId', postsController.update);
  // Get all posts for a user
  app.get('/api/users/:userId/posts', postsController.list);
  // Get post by ID for a user
  app.get('/api/users/:userId/posts/:postId', postsController.get);
  app.delete('/api/users/:userId/posts/:postId', postsController.destroy);
// Category Routes
  app.post('/api/categories', categoriesController.create);
  app.put('/api/categories/:categoryId', categoriesController.update);
  app.get('/api/categories/:categoryId', categoriesController.get);
  app.get('/api/categories', categoriesController.list);
  app.delete('/api/categories/:categoryId', categoriesController.destroy);
// Tag Routes
  app.post('/api/tags', tagsController.create);
  app.put('/api/tags/:tagId', tagsController.update);
  app.get('/api/tags/:tagId', tagsController.get);
  app.get('/api/tags/', tagsController.list);
  app.delete('/api/tags/:tagId', tagsController.destroy);
}
