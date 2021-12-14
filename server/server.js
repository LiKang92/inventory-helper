/*
server start module
1 start by express
2 connect mongoDB by mongoose, start server only after connected to database
3 use middleware

 */
const mongoose = require('mongoose')
const express = require('express')
const app = express() // create server

//declare and use static middleware
app.use(express.static('public'))

// Declare middleware that parses POST requests
app.use(express.urlencoded({ extended: true })) // request body parameters are: name=tom&pwd=123

// Declare middleware that uses cookie data parsing
const cookieParser = require('cookie-parser')
app.use(cookieParser())


// Declare middleware that uses token authentication
app.use(require('./middleware/token-verify'))

// Declare the use of router middleware
const indexRouter = require('./routers')
app.use('/', indexRouter)

app.get('/test', function (req, res) {
    res.send({
        code: 0,
        data: 'hello react test'
    })
})

// connect database with mongoose 
const { SERVER_CONFIG, DB_CONFIG } = require('./config')
mongoose.connect(`mongodb://localhost:${DB_CONFIG.port}/${DB_CONFIG.name}`, { useNewUrlParser: true })
    .then(() => {
        console.log('Successfully connect to database')
        // start server only after connected to database
        app.listen(SERVER_CONFIG.port, () => {
            console.log(`Server start successfully, please vist: http://localhost:${SERVER_CONFIG.port}`)
        })
    })
    .catch(error => {
        console.error('Failed to connect to database', error)
    })