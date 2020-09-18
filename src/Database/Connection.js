const mongoose = require('mongoose');
require('dotenv/config');

const connectDB = async () => {
  const connection = await mongoose.connect(
    process.env.MONGO_KEY,
    { useNewUrlParser: true },
    { useUnifiedTopology: true },
  );

  console.log('Connected to database!')

  return connection;
};

module.exports = connectDB;
