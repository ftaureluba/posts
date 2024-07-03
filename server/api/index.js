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
const fs = require('fs')
const nodemailer = require('nodemailer');
const mongodb = require('mongodb')
import { mongoHandler } from './connectToDatabase';

  //origin: 'https://taurel-fitness-app.vercel.app', // Specify your frontend URL
app.use(morgan('combined'));
app.use(bodyParser.json());
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization,auth-token"
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle pre-flight requests
//app.options('*', cors(corsOptions));

const crypto = require('crypto');

function generateVerificationToken() {
  return crypto.randomBytes(20).toString('hex');
}
const User = config.User;
const Rutina = config.Rutina;
const Workout = config.Workout;
const exerciseStatic = config.exerciseStatic;

const mongoDBURL = process.env.MONGODB_URL;
const secretKey = process.env.JWT_SECRET_KEY;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
//dotenv.config()

//manejar conexiones a mongodb



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://taurel-fitness-app.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,auth-token');
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

const verifyToken = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    console.log('esta por hacer el verify')
    const verified = jwt.verify(token, secretKey);
    console.log('esta por setear req.user')
    req.user = verified;
    console.log('esta por hacer el findbyid')
    // Check if the user is verified
    const user = await User.findById(req.user._id);
    console.log('hizo el findbyid, user: ', user)
    if (!user.isVerified) {
      return res.status(401).send('Account not verified');
    }
    console.log('hizo es isverified')
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};
app.get("/api/posts", (req, res) => {
    const coso = ['cisi', 'da']
  res.send(coso);
});

//mongoose.connect(mongoDBURL)
  //.then(() => {

    async function findRutinas() {
      try {
        const {mongoClient} = await mongoHandler();
        const db = mongoClient.db("Fitness-App")
        const collection = db.collection("rutinas")
        const rutinas = await collection.aggregate([
          {
            $lookup: {
              from: 'exercisestatics', // The name of the referenced collection
              localField: 'ejercicios',
              foreignField: '_id',
              as: 'ejercicios'
            }
          }
        ]).toArray();
        /*
        const rutinas = await Rutina.aggregate([
          {
            $lookup: {
              from: 'exercisestatics', // The name of the referenced collection
              localField: 'ejercicios',
              foreignField: '_id',
              as: 'ejercicios'
            }
          }
        ]);*/
        return rutinas;
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

    app.get('/api', async (req, res) => {
      try {
        const rutinas = await findRutinas();
        res.json(rutinas);
      } catch (err) {
        res.status(500).send('Error finding rutinas');
      }
    });
    app.get('/api/:rutina_id', async (req, res) => {
      try{
        const {mongoClient} = await mongoHandler();
        console.log('paso la conexion')
        const db = mongoClient.db("Fitness-App")
        const collection = db.collection("rutinas")
        const rutinaId = req.params.rutina_id;
        console.log('pudo crear el object id', rutinaId)
        
        // Convert rutinaId to ObjectId
        const rutinaObjectId = new mongoose.Types.ObjectId(rutinaId);
        console.log('ahora si es el object id como tal')
        const rutina = await collection.aggregate([
          {
              $match: { _id: rutinaObjectId } 
          },
          {
              $lookup: {
                  from: 'exercisestatics', // The name of the referenced collection
                  localField: 'ejercicios',
                  foreignField: '_id',
                  as: 'ejercicios'
              }
          }
      ]).toArray();
        //const rutinas = await Rutina.findById(req.params.rutina_id).populate('ejercicios').exec();
      console.log('ya hizo el agregate')
        //console.log(rutinas)
        if (!rutina) {
          return res.status(404).send('Rutina not found');
        }
        //rutina.populate('ejercicios').exec()
        res.json(rutina[0])
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
        const newWorkout = new Workout({
          userId: req.user._id,
          date: new Date(),
          exercises: req.body.exercises.map(exercise => ({
            exerciseId: exercise.exerciseId,
            sets: exercise.sets
          }))
        });
        
    
        // Associate the workout with the user
        /*const user = await User.findById(req.user._id);
        user.workouts.push(savedWorkout._id);
        await user.save();*/
        const {mongoClient} = await mongoHandler();
        console.log('paso la conexion')
        const db = mongoClient.db("Fitness-App")
        const collection = db.collection("users")
        const workoutCollection = db.collection('workouts')
        console.log('esta por hacer el insertOne para workouts')
        const workoutSaved = await workoutCollection.insertOne(newWorkout)
        const workoutId = workoutSaved.insertedId;
        
        const userId = req.user._id
        //const userObjectId= new mongoose.Types.ObjectId(userId) esta de mas? creo que req.user._id ya da el objectid como tal

        const userUpdated = await collection.updateOne(
          {_id : userId},
          {$push: {workouts: workoutId}}
        )
        //user.workouts.push(savedWorkout._id);
        //await user.save();
        res.status(201).json(workoutSaved);
      } catch (err) {
        res.status(500).send("Error saving workout");
      }
    });
    app.get('/api/workouts', verifyToken, async (req, res) => {
      try {
        const workouts = await Workout.find({ userId: req.user._id }).populate({
          path: 'exercises.exerciseId',
          model: 'exerciseStatic'
        }).exec();
        res.json(workouts);
      } catch (err) {
        res.status(500).send('Error fetching workouts');
      }
    });
    
    //findRutinas(); 
  
  /*
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });*/


// app.js or routes file
app.get('/api/exercises', async (req, res) => {
  try {
    const exercises = await exerciseStatic.find({});
    res.json(exercises);
  } catch (error) {
    res.status(500).send('Error fetching exercises');
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const {mongoClient} = await mongoHandler();
    console.log('paso la conexion')
    const db = mongoClient.db("Fitness-App")
    const collection = db.collection("users")
    const users = await collection.aggregate([
      {$match: {email: req.body.email}}
    ]).toArray();
    const user = users[0]
    console.log('pudo encontrar el user? ')
    if (!user) {
      return res.status(400).send('User not found');
    }
    console.log('si. Esta verificado?')
    if (!user.isVerified) {
      return res.status(401).send('Account not verified');
    }
    console.log('si, encuentra la contrasena?')
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid email or password');
    }
    console.log('contrasena valida')
    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    console.log('token valido')
    res.header('auth-token', token).send({token});
    console.log('token enviado')
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

async function sendVerificationEmail(user) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: email,
      pass: password
    }
  });
  const mailOptions = {
    from: email,
    to: user.email,
    subject: 'Account Verification',
    text: `Please verify your account by clicking the link: 
    http://localhost:3000/verify-email?token=${user.verificationToken}`
  };
try {
    let info = await transporter.sendMail(mailOptions);
} catch (error) {
    console.error('Error sending email: ', error);
}};

app.post('/api/signup', async (req, res) => {
  try {
    const verificationToken = generateVerificationToken();
    const tokenExpiration = Date.now() + 3600000;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      verificationToken: verificationToken,
      tokenExpiration: tokenExpiration
    });
    await user.save();
    await sendVerificationEmail(user);
    res.status(201).send('User created successfully, please check email to verificate account.');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

app.get('/api/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({ verificationToken: token, tokenExpiration: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.tokenExpiration = undefined;
    await user.save();

    res.send('Account verified successfully');
  } catch (error) {
    res.status(500).send('Error verifying account');
  }
});

app.get('/api/protected-route', verifyToken, (req, res) => {
  res.send('You are authenticated');
});

const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


/*
    async function updateDocument() {
      ejerciciosPath = './src/ejercicios.json'

      try {
        const exercisesData = fs.readFileSync(ejerciciosPath, 'utf8');
        const exercises = JSON.parse(exercisesData);

        const db = mongoose.connection;
        const collection = db.collection('exercisestatics'); // Assuming your collection name is 'exercises'

        await collection.deleteMany({});
        const result = await collection.insertMany(exercises);
        console.log("eh??")
        /*
    const doc = await Rutina.findOneAndUpdate(filter,
       {ejercicios: [
        "sentadillas",
        "peso muerto",
        "gemelos"
      ]})
    }catch (error){
      console.log(error, "que te la saque el tordo")
    }}

updateDocument();*/
/*
const exerciseIds = [
  new mongoose.Types.ObjectId("665c8e1f8aef363c1cde06b0"), // ObjectId for "Squats"
  new mongoose.Types.ObjectId('665c8e1f8aef363c1cde06b2'), // ObjectId for "Deadlift"
  new mongoose.Types.ObjectId('665c8e1f8aef363c1cde06b3'), // ObjectId for "Quad Extensions"
  new mongoose.Types.ObjectId('665c8e1f8aef363c1cde06b5'), // ObjectId for "Leg Curls"
  new mongoose.Types.ObjectId('665c8e1f8aef363c1cde06b6'), // ObjectId for "Leg Press"
  new mongoose.Types.ObjectId('665c8e1f8aef363c1cde06b7')  // ObjectId for "Calf Raise"
];
    async function updateDocument() {
    const filter = {Rutina: "Pull"}
    const doc = await Rutina.findOneAndUpdate(filter,
       {ejercicios: exerciseIds

        /*
        "squats",
  "deadlift",
  "quad_extensions",
  "leg_curls",
  "leg_press",
  "calf_raise",// Metodo para updatear el mongo db con un filtro (me va a servir mas adelante seguro)

      }, {new: true});
      if (doc){console.log('documento updateado: ', doc)} else {console.error('no document found for filter')}
    }
    updateDocument();*/
/*
    const updateRutina = async () => {
      const rutinas = await Rutina.find();

      for (const rutina of rutinas) {
        const updatedEjercicios = [];

        for (const ejercicioName of rutina.ejercicios) {
          const exerciseStatic = await exerciseStatic.findOne({ name: ejercicioName });

          if (exerciseStatic) {
            updatedEjercicios.push(exerciseStatic._id);
          } else {
            console.error(`ExerciseStatic not found for name: ${ejercicioName}`);
          }
        }

        rutina.ejercicios = updatedEjercicios;
        await rutina.save();
      }

      console.log("Rutina documents updated successfully!");
      mongoose.connection.close();
    };*/


    /*
    async function updateExerciseIds() {
      const exercises = await exerciseStatic.find();
      //const db = mongoose.connection;
      //const collection = db.collection('exercisestatics');
      for (let exercise of exercises) {
        const newId = new mongoose.Types.ObjectId();
        const newEx = new exerciseStatic({
          _id: newId,
          name: exercise.name,
          equipment: exercise.equipment,
          category: exercise.category
        })
        await newEx.save()
        await exerciseStatic.deleteOne({_id: exercise._id})
        console.log(`Updated exercise ${exercise.name} to new ID ${newId}, ${exercise._id}`);
      }

      console.log('All exercises updated.');}

updateExerciseIds()*/