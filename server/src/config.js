const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  date: {
    type: Date,
    default: Date.now
  },
  workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }]
  // Other user-related fields
});

const User = mongoose.model('User', userSchema);

const setSchema = new Schema({
  reps: Number,
  weight: Number
});

const exerciseSchema = new Schema({
  exerciseId: {type: Schema.Types.ObjectId},
  sets: [setSchema]
});

const exerciseStaticSchema = new Schema ({
  name : String,
  category: String,
  equipment: String
}, {collection: 'ejercicios'})
const exerciseStatic = mongoose.model('exerciseStatic', exerciseStaticSchema)

const workoutSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
  User: User,
  exerciseStatic: exerciseStatic
};