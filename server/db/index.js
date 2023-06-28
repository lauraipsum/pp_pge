require('dotenv').config({path: __dirname + '/.env.database'})
const mongoose = require('mongoose')

const DATABASE = process.env.DATABASE;

mongoose
    .connect(DATABASE, { useNewUrlParser: true ,useUnifiedTopology: true})
    .then(console.log('Connected to MongoDB'))
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

