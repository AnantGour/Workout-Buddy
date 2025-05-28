const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    tutorialImageUrl: {     
        type: String,
        required: false
      }
}, { timestamps: true });  
module.exports = mongoose.model('Workout', workoutSchema); // 'Workout' is the name of the model, and workoutSchema is the schema definition. Mongoose will create a collection named 'workouts' in the database. The model can be used to interact with the 'workouts' collection.
