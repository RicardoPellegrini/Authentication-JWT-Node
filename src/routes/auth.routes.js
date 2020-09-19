const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');


authRouter.post('/register', async (request, response) => {
  const { name, email, password } = request.body;

  // Validar dados antes de criar usuário
  const { error } = registerValidation(request.body);
  if (error) {
    return response.status(400).send(error.details[0].message);
  }

  // Checar se o email já está cadastrado no sistema
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return response.status(400).send('This email is already registered');
  }

  // Criptografar a senha do usuário
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar novo usuário
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    response.send(savedUser);
  } catch(err) {
    response.status(400).send(err);
  }
});

authRouter.post('/login', async (request, response) => {
  const { email, password } = request.body;

  // Validar login
  const { error } = loginValidation(request.body);
  if (error) {
    return response.status(400).send(error.details[0].message);
  }

  // Checar se o email se encontra cadastrado
  const user = await User.findOne({ email });
  if (!user) {
    return response.status(400).send('This email/password is not correct');
  }

  // Checar se a senha informada está correta
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return response.status(400).send('This email/password is not correct');
  }

  // Criar um token para esse acesso
  const token = jwt.sign(
    {_id: user._id},
    process.env.TOKEN_SECRET,
    { expiresIn: '1h' },
  );
  response.header('auth-token', token);

  response.send(token);
});

module.exports = authRouter;