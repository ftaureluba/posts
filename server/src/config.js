const { default: mongoose } = require("mongoose");



const Schema = mongoose.Schema;

const rutina = new Schema({
    'Rutina': String,
    "Descripcion": String
})
const modelo = mongoose.model('modelo', rutina)

module.exports = {
    mongoDBURL : 'mongodb+srv://admin:admin@fitness-app.wqetgeo.mongodb.net/Fitness-App?retryWrites=true&w=majority&appName=Fitness-App',
    modelo:modelo
}