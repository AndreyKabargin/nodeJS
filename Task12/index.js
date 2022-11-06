const express = require('express')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')

const app = express()
app.use(express.urlencoded({extended:false}));
app.set("view engine", "ejs")

app.use('/', indexRouter)

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB)
        app.listen(PORT, () => {
            console.log(`Server running (${PORT})`)
        })
    } catch(err) {
        console.log(err)
    }

}

const UrlDB = 'mongodb://localhost:27017'
const PORT = process.env.PORT || 3000

start(PORT, UrlDB)