const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String
    },
    content: {
        type: String
    },
    status: {
        type: String
    },
    deadline: {
        type: Date
    },
    usersList: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
})

module.exports = mongoose.model('Task', taskSchema)