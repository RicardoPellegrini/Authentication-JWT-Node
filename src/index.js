const express = require('express');
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/posts.routes');

const connectDB = require('./database/Connection');

const app = express();

// Conectar ao MongoDB
connectDB();

// Middlewares
app.use(express.json());

// Importar as rotas
app.use('/api/users', authRouter);
app.use('/api/posts', postRouter);

app.listen(3000, () => console.log('Server is running!'));