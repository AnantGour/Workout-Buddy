const express = require('express');
const router = express.Router();

const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController');

const upload = require('../middleware/upload'); // multer config

// Routes

// Get all workouts
router.get('/', getWorkouts);

// Get a single workout
router.get('/:id', getWorkout);

// Post a new workout with image upload
router.post('/', upload.single('tutorialImage'), createWorkout);

// Delete a workout
router.delete('/:id', deleteWorkout);

// Update a workout
router.patch('/:id', updateWorkout);

module.exports = router;
