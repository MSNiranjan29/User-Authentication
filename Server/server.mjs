import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: 'your_session_secret_here',
    resave: true,
    saveUninitialized: true,
  })
);

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/UserData")

  .then(() => {
    console.log('MongoDB connected');

    // User schema
    const userSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String
    });

    const User = mongoose.model('User', userSchema);

    // Root route handler
    app.get('/', (req, res) => {
      res.send('Welcome to the API');
    });

    // Register route
    app.post('/api/register', async (req, res) => {
      try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
          username,
          email,
          password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // Login route
    app.post('/api/login', async (req, res) => {
      try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Invalid email or password');
        }

        // Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          throw new Error('Invalid email or password');
        }

        // Store user data in session
        req.session.user = {
          _id: user._id,
          username: user.username,
          email: user.email
        };

        res.status(200).json({ message: "Login successful" });
      } catch (error) {
        res.status(401).json({ error: error.message });
      }
    });

    // Logout route
    app.post('/api/logout', (req, res) => {
      req.session.destroy();
      res.json({ message: 'Logged out successfully' });
    });

    // Profile route
    app.get('/api/profile', (req, res) => {
      if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      res.json(req.session.user);
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
