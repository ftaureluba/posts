const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config'); 
const mongoose = require('mongoose');
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());



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
        console.log(rutina)
        res.json(rutina)
      }catch(err) {res.status(500).send('error buscando rutinas')}
    })
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
    findRutinas(); 
  })
  
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
