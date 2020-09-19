const jwt = require('jsonwebtoken');

function verifyToken(request, response, next) {
  // Verificar se existe um token na requisição
  const token = request.header('auth-token');
  if (!token) {
    return response.status(401).send('Access denied');
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    request.user = verified;

    next();
  } catch(err) {
    response.status(400).send('Invalid token');
  }
};

module.exports = verifyToken;