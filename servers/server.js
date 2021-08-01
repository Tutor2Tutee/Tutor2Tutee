require('dotenv').config()
const express = require('express')
// const cors = require('cors')
const port = process.env.PORT || 3001
const mongoose = require('mongoose')
const morgan = require('morgan')

const route = require('./routes/index')
const path = require("path");
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
// if want to use CORS just uncomment it
// app.use(cors())
// morgan is for log purpose
const buildPath = path.normalize(path.join(__dirname + '/../build'))
app.use(express.static(buildPath))


app.use('/api', route)
app.use('/api', morgan('tiny'))
app.set('jwt-secret', process.env.SECRET)


if (process.env.NODE_ENV !== "test") {
    app.get('(/*)?', async (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'))
    })
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
        dbName: 'Tutor2Tutee'
    }).then(() => {
        console.log('MongoDB connected!')
        app.listen(port, () => {
            console.log(`express is runnning on ${port}`)
        })

    }).catch((err) => {
        console.error(err)
    })
}

module.exports = app;