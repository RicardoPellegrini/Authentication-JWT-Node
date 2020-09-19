const express = require('express');
const postsRouter = express.Router();

const User = require('../models/User');

const verifyAuth = require('../middlewares/verifyToken');

postsRouter.get('/', verifyAuth, async (request, response) => {
  const { _id } = request.user;

  // response.status(200).send(request.user);
  const user = await User.findById(_id);
  response.status(200).send(`User ${user.name} is authenticated and is allowed to make posts now.`);
});

module.exports = postsRouter;