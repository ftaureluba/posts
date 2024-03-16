const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoDBURL = require('./config')
const mongoose = require('mongoose')

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

mongoose.connect(mongoDBURL.mongoDBURL)
.then(() =>{
  console.log('App conectada')
}
).catch((error) => {console.log(error)}
)