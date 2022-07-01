const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const Task = require('../models/task')
const jsonParser = bodyParser.json()
const verify = require('./verifyToken')

router.get('/', verify.checkLogin, async (req, res) => {

    let query = {}
    if(req.body.name) query.name = req.body.name;
    if(req.body.content) query.content = req.body.content;
    if(req.body.status) query.status = req.body.status;

    try {
        const tasks = await Task.find(query)
        res.json(tasks)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', verify.checkLogin, getTask, async (req, res) => {
    res.json(res.task)
})

router.post('/', verify.checkLogin, verify.checkAdmin, async (req, res) => {
    const task = new Task({
        name: req.body.name,
        content: req.body.content,
        status: req.body.status,
        deadline: req.body.deadline
    })
    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.patch('/:id', verify.checkLogin, verify.checkAdmin, getTask, async (req, res) => {
    if(req.body.name != null) {
        res.task.name = req.body.name
    }
    if(req.body.content != null) {
        res.task.content = req.body.content
    }
    if(req.body.status != null) {
        res.task.status = req.body.status
    }
    if(req.body.deadline != null) {
        res.task.deadline = req.body.deadline
    }

    try {
        const updatedTask = await res.task.save()
        res.json(updatedTask)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', verify.checkLogin, verify.checkAdmin, getTask, async (req, res) => {
    try {
        await res.task.remove()
        res.json({message: "task deleted"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getTask(req, res, next) {
    let task;
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

module.exports = router