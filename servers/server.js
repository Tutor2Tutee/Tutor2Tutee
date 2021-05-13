const express = require('express')
// const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

const route = require('./routes/index')


app.use(bodyParser.json())
// CORS쓰고 싶으면 주석해제
// app.use(cors())
app.use('/api', route)

app.listen(port, () => {
    console.log(`express is runnning on ${port}`)
})