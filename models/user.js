const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    firstname: {
        type: String
    },
    surname: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    },
    salary: {
        type: Number
    }
})

module.exports = mongoose.model('User', userSchema)