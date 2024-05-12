const mongoose = require('mongoose');

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/auth_demo'; // Use the correct URI for your MongoDB database

// Connect to MongoDB
mongoose.connect(uri, options)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose.connection; // Export the connection object
