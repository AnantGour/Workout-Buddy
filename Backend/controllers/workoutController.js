const { get } = require('mongoose');
const Workout = require('../models/workout');
const mongoose = require('mongoose');



//get all wrokouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
};




//get a singel workouts 
const getWorkout = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid workout ID' });
    }

    try {
        const workout = await Workout.findById(id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}



//create new workouts 
const cloudinary = require('../utils/cloudinary');

const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;
    let emptyFields = [];
  
    if (!title) emptyFields.push('title');
    if (!load) emptyFields.push('load');
    if (!reps) emptyFields.push('reps');
    if (!req.file) emptyFields.push('tutorialImage');
  
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }
  
    try {
      const workout = await Workout.create({
        title,
        load,
        reps,
        tutorialImageUrl: req.file.path, // already uploaded by multer-storage-cloudinary
      });
  
      res.status(200).json(workout);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


//delete a workouts
const deleteWorkout = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid workout ID' });
    }

    try {
        const workout = await Workout.findOneAndDelete({_id: id});
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};






//update a workouts
const updateWorkout = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid workout ID' });
    }

    try {
        const workout = await Workout.findOneAndUpdate({_id: id},
            { ...req.body

            });
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}