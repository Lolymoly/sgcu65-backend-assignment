const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const User = require('../models/user')

const jsonParser = bodyParser.json()
const verify = require('./verifyToken')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/changepassword', verify.checkLogin, async (req, res) => {
    const userID = req.user._id;
    const thisUser = await User.findOne({_id: userID});

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.newpassword, salt)

    thisUser.password = hashPassword
    try {
        const updateUser = await thisUser.save()
        res.status(201).send(updateUser)
    } catch (err) {
        return res.status(400).send(err)
    }

})

router.get('/', verify.checkLogin, async (req, res) => {
    const userID = req.user._id;
    const thisUser = await User.findOne({_id: userID});
    const userRole = thisUser.role
    if(userRole != "admin") {
        // user can only view yourself data
        return res.send(thisUser)
    }

    let query = {}
    if(req.body.firstname) query.firstname = req.body.firstname;
    if(req.body.surname) query.surname = req.body.surname;
    if(req.body.role) query.role = req.body.role;

    try {
        const users = await User.find(query)
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', verify.checkLogin, verify.checkAdmin, getUser, async (req, res) => {
    // res.send(res.user.firstname)
    res.json(res.user)
})

router.post('/', verify.checkLogin, verify.checkAdmin, async (req, res) => {
    // console.log(req.firstname)
    // console.log(req.surname)

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        email: req.body.email,
        password : hashPassword,
        firstname: req.body.firstname,
        surname: req.body.surname,
        role: req.body.role,
        salary: req.body.salary
    })
    try {
        const newUser = await user.save()
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        res.status(201).json({
            "user" : newUser,
            "token" : token
        })
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.patch('/:id', verify.checkLogin, verify.checkAdmin, getUser, async (req, res) => {
    if(req.body.email != null) {
        res.user.email = req.body.email
    }
    if(req.body.firstname != null) {
        res.user.firstname = req.body.firstname
    }
    if(req.body.surname != null) {
        res.user.surname = req.body.surname
    }
    if(req.body.role != null) {
        res.user.role = req.body.role
    }
    if(req.body.salary != null) {
        res.user.salary = req.body.salary
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', verify.checkLogin, verify.checkAdmin, getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({message: "user deleted"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

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