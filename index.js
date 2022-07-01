require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("connected to db"))

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const tasksRouter = require('./routes/tasks')
app.use('/tasks', tasksRouter)

const assignRouter = require('./routes/assign')
app.use('/assign', assignRouter)

const authRouter = require('./routes/auth')
app.use(authRouter)

app.listen(3000, () => {
    console.log("Server started")
})