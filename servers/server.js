require('dotenv').config()
const express = require('express')
// const cors = require('cors')
const port = process.env.PORT || 3001
const mongoose = require('mongoose')
const morgan = require('morgan')

const route = require('./routes/index')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
// CORS 쓰고 싶으면 주석해제
// app.use(cors())
// morgan은 로그 기록용.
app.use('/api',morgan('tiny'))

app.use('/api', route)
app.set('jwt-secret', process.env.SECRET)
console.log(__dirname + '/../build')
app.use(express.static(__dirname + '/../build'))


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




