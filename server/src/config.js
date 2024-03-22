const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const setSchema = new Schema({
  reps: Number,
  weight: Number
});

const exerciseSchema = new Schema({
  name: String,
  sets: [setSchema]
});

const workoutSchema = new Schema({
  date: { type: Date, default: Date.now },
  exercises: [exerciseSchema]
}, {collection: "workouts"});

const Workout = mongoose.model('Workout', workoutSchema);

const rutinaSchema = new Schema({
  Rutina: String,
  Descripcion: String,
  ejercicios: [String]
});

const Rutina = mongoose.model('Rutina', rutinaSchema);

module.exports = {
    mongoDBURL: "mongodb+srv://admin:admin@fitness-app.wqetgeo.mongodb.net/Fitness-App?retryWrites=true&w=majority&appName=Fitness-App",
  Rutina: Rutina,
  Workout: Workout
};