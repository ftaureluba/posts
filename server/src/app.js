const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config')
const mongoose = require('mongoose')
const {modelo} = require('./config')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) =>{
  return res.send('HOME')
}
  )


app.get('/posts', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Como andas"
    }]
  )
})

app.listen(process.env.PORT || 8081)

mongoose.connect(config.mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>{
  console.log('App conectada')
  modelo.find({}).then(docs => {
    console.log('Rutinas encontradas:', docs)
  })
  
}
).catch((error) => {console.log(error)}
)