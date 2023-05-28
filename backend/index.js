const connectToMongo=require('./db');
const express = require('express')
var app = express();
connectToMongo();


const port = 5000
var cors = require('cors')


app.use(cors())
app.use(express.json())
//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Unotebook backend listening on port http://localhost:${port}`)
})