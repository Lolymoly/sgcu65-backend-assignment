const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    surname: {
        type: String
    },
    role: {
        type: String,
        default: "user",
        required: true
    },
    salary: {
        type: Number
    },
    tasksList: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
})

module.exports = mongoose.model('User', userSchema)