const express = require('express')

const indexRouter = require('./routes/index')

const app = express()
app.use(express.urlencoded({extended:false}));
app.set("view engine", "ejs")

app.use('/', indexRouter)

const PORT = 3000

app.listen(PORT)