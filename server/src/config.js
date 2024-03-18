const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rutinaSchema = new Schema({
  Rutina: String,
  Descripcion: String,
  ejercicios: [String]
});

const Rutina = mongoose.model('Rutina', rutinaSchema);

module.exports = {
    mongoDBURL: "mongodb+srv://admin:admin@fitness-app.wqetgeo.mongodb.net/Fitness-App?retryWrites=true&w=majority&appName=Fitness-App",
  Rutina: Rutina
};