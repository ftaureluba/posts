const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config'); 
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

dotenv.config()

app.get('/posts', (req, res) => {
  res.send([{
    title: "Hello World!",
    description: "Como annnnnnnndas"
  }]);
});

mongoose.connect(config.mongoDBURL)
  .then(() => {
    console.log('App conectada');

    const Rutina = config.Rutina;
    const Workout = config.Workout;
    async function findRutinas() {
      try {
        const rutinas = await Rutina.find({});
        
        return rutinas
        
      } catch (error) {
        console.error('Error finding rutinas:', error);
      }
    }
    app.get('/', async (req, res) => {
      try {
        const rutinas = await findRutinas();
        res.json(rutinas);
      } catch (err) {
        res.status(500).send('Error finding rutinas');
      }
    });
    app.get('/:rutina_id', async (req, res) => {
      try{
        const rutina = await Rutina.findOne({_id: req.params.rutina_id})
        if (!rutina) {
          return res.status(404).send('Rutina not found');
        }
        res.json(rutina)
      }catch(err) {res.status(500).send('error buscando rutinas')}
    })
    app.post('/api/workouts', async (req, res) => {
      try {
        const newWorkout = new Workout(req.body);
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
        console.log("Guardado correctamente?:")
        console.log(savedWorkout)
      } catch (err) {
        res.status(500).send("Error saving workout");
      }
    });
    findRutinas(); 
  })
  
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


/*
    async function updateDocument() {
    const filter = {Rutina: "Legs"}
    const doc = await Rutina.findOneAndUpdate(filter,
       {ejercicios: [
        "exercise_pullups",
  "exercise_lat_pulldowns",
  "exercise_seated_rows",
  "exercise_standing_rows",
  "exercise_pullovers",
  "exercise_bicep_curl",
  "exercise_incline_bicep_curl",
  "exercise_preacher_curls",      Metodo para updatear el mongo db con un filtro (me va a servir mas adelante seguro)
  "exercise_cable_seated_rows",
  "exercise_shrugs"
      ]})
    }
    updateDocument();*/