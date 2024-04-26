require('dotenv').config({path: './src/.env'});
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


const User = config.User;
const Rutina = config.Rutina;
const Workout = config.Workout;

const mongoDBURL = process.env.MONGODB_URL;
const secretKey = process.env.JWT_SECRET_KEY;

console.log(mongoDBURL)
//dotenv.config()



const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

app.get('/posts', (req, res) => {
  res.send([{
    title: "Hello World!",
    description: "Como annnnnnnndas"
  }]);
});

mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('App conectada');
    
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
    })/*
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
    });*/
    app.post('/api/workouts', verifyToken, async (req, res) => {
      try {
        const newWorkout = new Workout(req.body);
        const savedWorkout = await newWorkout.save();
    
        // Associate the workout with the user
        const user = await User.findById(req.user._id);
        user.workouts.push(savedWorkout._id);
        await user.save();
    
        res.status(201).json(savedWorkout);
      } catch (err) {
        res.status(500).send("Error saving workout");
      }
    });
    app.get('/api/workouts', verifyToken, async (req, res) => {
      try {
        const user = await User.findById(req.user._id).populate('workouts');
        res.json(user.workouts);
      } catch (err) {
        res.status(500).send('Error fetching workouts');
      }
    });
    findRutinas(); 
  })
  
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid password');
    }

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    res.header('auth-token', token).send(token);
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

app.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email
    });
    await user.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
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