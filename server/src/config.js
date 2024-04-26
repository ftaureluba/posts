const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  profilePicture: String,
  workoutGoals: String,
  workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }]
  // Other user-related fields
});

const User = mongoose.model('User', userSchema);

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
    mongoDBURL: process.env.mongoDBURL, //"mongodb+srv://admin:admin@fitness-app.wqetgeo.mongodb.net/Fitness-App?retryWrites=true&w=majority&appName=Fitness-App",
  Rutina: Rutina,
  Workout: Workout,
  User: User
};