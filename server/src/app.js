const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config'); // Make sure the path to config.js is correct

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

// Connect to the MongoDB database
mongoose.connect(config.mongoDBURL)
  .then(() => {
    console.log('App conectada');

    // Define the Rutina model
    const Rutina = config.Rutina;

    // Async function to find rutinas
    async function findRutinas() {
      try {
        const rutinas = await Rutina.find({});
        console.log(rutinas)
        return rutinas
        
      } catch (error) {
        console.error('Error finding rutinas:', error);
      }
    }/*
    app.get('/', (req, res) => {
      res.send('HOME', async (req, res)=>{
        try {
          const rutinas = await findRutinas();
          res.json(rutinas)
        }catch(err) {
          res.status(500).send('Error encontrando las rutinas')
        }
      });
    });*/
    app.get('/', async (req, res) => {
      try {
        const rutinas = await findRutinas();
        res.json(rutinas);
      } catch (err) {
        res.status(500).send('Error finding rutinas');
      }
    });
    // Call the function to execute the query
    findRutinas();
  })
  
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Start the server
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
