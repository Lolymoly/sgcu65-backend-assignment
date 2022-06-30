const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const Task = require('../models/task')
const User = require('../models/user')
const mongoose = require('mongoose')
const jsonParser = bodyParser.json()


router.post('/:id', async (req, res) => {
    let userIDList;
    if(req.body.users instanceof Array) {
        userIDList = req.body.users;
    }
    else {
        userIDList = [req.body.users]
    }

    Task.updateOne({_id: req.params.id},  {
        $addToSet: {
            usersList: {
                $each: userIDList
            }
        }
    }).exec().then(response => res.json(response))



    User.updateMany({_id: {
        $in: userIDList
    }}, {
        $addToSet: {
            tasksList: {
                $each: [req.params.id]
            }
        }
    }).exec()
    
    return;
})



async function getTask(req, res, next) {
    let user;
    try {
        task = await Task.findById(req.params.id)
        if (task == null) {
            return res.status(404).json({message: "Can't find this task"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.task = task;
    next()
}

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message: "Can't find this user"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.user = user;
    next()
}

module.exports = router