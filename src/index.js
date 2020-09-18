const express = require('express');
const authRouter = require('./routes/auth.routes');
const connectDB = require('./Database/Connection');


const app = express();

app.use(express.json());

// Conectando ao MongoDB
connectDB();

// Importando as rotas
app.use('/api/user', authRouter);

app.listen(3000, () => console.log('Server is running!'));