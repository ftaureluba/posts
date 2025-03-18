import mongoose from "mongoose";

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
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  tokenExpiration: { type: Date },
  workouts: [{ type: Schema.Types.ObjectId, ref: 'workouts' }]
  // Other user-related fields
});

const User = mongoose.model('User', userSchema);

const setSchema = new Schema({
  reps: Number,
  weight: Number
});

const exerciseSchema = new Schema({
  exerciseId: {type: Schema.Types.ObjectId, ref: 'exerciseStatic'},
  sets: [setSchema]
});
const exercise = mongoose.model('exercise', exerciseSchema)
const exerciseStaticSchema = new Schema ({
  name : String,
  category: String,
  equipment: String
}, {collection: 'exercisestatics'})
const exerciseStatic = mongoose.model('exerciseStatic', exerciseStaticSchema)

const workoutSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  date: { type: Date, default: Date.now },
  exercises: [
    {
      exerciseId: { type: Schema.Types.ObjectId, ref: 'exerciseStatic' },
      sets: [setSchema]
    }
  ]
}, { collection: "workouts" });

const Workout = mongoose.model('Workout', workoutSchema);

const rutinaSchema = new Schema({
  Rutina: String,
  Descripcion: String,
  ejercicios: [{type : Schema.Types.ObjectId, ref: 'exerciseStatic'}]
});

const Rutina = mongoose.model('Rutina', rutinaSchema);

export const mongoDBURL = process.env.mongoDBURL; //"mongodb+srv://admin:admin@fitness-app.wqetgeo.mongodb.net/Fitness-App?retryWrites=true&w=majority&appName=Fitness-App";
export const config = {
  Rutina,
  Workout,
  User,
  exerciseStatic
};