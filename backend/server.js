const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const app = express()

//conneced to database
connectDB()

// - middleware to parse the body data
app.use(express.json()) // returns middleware that only parse Json
app.use(express.urlencoded({extended: false})) // returns middleware that only parse urlencoded bodies


app.get('/', (req, res) => {
  res.status(200).json({message: 'WELCOME TO THIS SERVER'})
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Bismillah running on ${PORT}`))