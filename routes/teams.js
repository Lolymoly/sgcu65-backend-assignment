const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const Task = require('../models/task')
const User = require('../models/user')
const Team = require('../models/team')
const jsonParser = bodyParser.json()
const verify = require('./verifyToken')

router.get('/', verify.checkLogin, verify.checkAdmin, async (req, res) => {

    let query = {}
    if(req.body.name) query.name = req.body.name;
    if(req.body._id) query._id = req.body._id;

    try {
        const teams = await Team.find(query)
        res.json(teams)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


router.post('/', verify.checkLogin, verify.checkAdmin, async (req, res) => {
    const team = new Team({
        name: req.body.name,
    })
    try {
        const newTeam = await team.save()
        res.status(201).json(newTeam)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.patch('/:id', verify.checkLogin, verify.checkAdmin, getTeam, async (req, res) => {
    if(req.body.name != null) {
        res.team.name = req.body.name
    }

    try {
        const updatedTeam = await res.team.save()
        res.json(updatedTeam)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', verify.checkLogin, verify.checkAdmin, getTeam, async (req, res) => {
    try {
        await res.team.remove()
        res.json({message: "team deleted"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getTeam(req, res, next) {
    let team;
    try {
        team = await Team.findById(req.params.id)
        if (team == null) {
            return res.status(404).json({message: "Can't find this team"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.team = team;
    next()
}

module.exports = router