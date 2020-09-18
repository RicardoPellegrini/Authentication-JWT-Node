const express = require('express');
const authRouter = express.Router();

authRouter.post('/register', (request, response) => {
  response.send('Register')
});

authRouter.post('/login', (request, response) => {
  response.send('Login')
});

module.exports = authRouter;