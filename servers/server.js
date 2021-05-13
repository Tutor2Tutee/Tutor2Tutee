require('dotenv').config()
const express = require('express')
// const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

const route = require('./routes/index')
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-1.crrhn.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
    dbName: 'Tutor2Tutee'
}).then(() => {
    console.log('MongoDB connected!')
}).catch((err) => {
    console.error(err)
})


app.use(bodyParser.json())
// CORS 쓰고 싶으면 주석해제
// app.use(cors())
app.use('/api', route)

app.listen(port, () => {
    console.log(`express is runnning on ${port}`)
})