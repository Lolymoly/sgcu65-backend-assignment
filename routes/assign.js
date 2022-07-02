const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const Task = require('../models/task')
const User = require('../models/user')
const Team = require('../models/team')
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

router.post('/team/user', async (req, res) => {
    //assign user to team
    const team = await Team.findById(req.body.teamid)
    const user = await User.findById(req.body.userid)

    if(!team) return res.status(404).send("Invalid Team")
    if(!user) return res.status(404).send("Invalid User")

    if(team.usersList.includes(user._id)) {
        return res.status(400).send("User already in this team")
    }

    team.usersList.push(user._id)
    user.team = team._id

    try {
        const updatedUser = await user.save()
        const updatedTeam = await team.save()
        res.json({
            "user" : updatedUser,
            "team" : updatedTeam
        })
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.post('/team/task', async (req, res) => {
    //assign task to team
    const team = await Team.findById(req.body.teamid)
    const task = await Task.findById(req.body.taskid)

    if(!team) return res.status(404).send("Invalid Team")
    if(!task) return res.status(404).send("Invalid Task")

    if(team.tasksList.includes(task._id)) {
        return res.status(400).send("Team already contain this Task")
    }

    team.tasksList.push(task._id)
    task.teamsList.push(team._id)
    try {
        const updatedTask = await task.save()
        const updatedTeam = await team.save()
        res.json({
            "task" : updatedTask,
            "team" : updatedTeam
        })
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router