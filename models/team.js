const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    usersList: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    tasksList: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
})

module.exports = mongoose.model('Team', teamSchema)