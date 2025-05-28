require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutsRoutes = require('./routes/workouts');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB and listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Middleware (place before routes)
app.use(express.json()); // still needed for non-file routes

// Logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutsRoutes);
