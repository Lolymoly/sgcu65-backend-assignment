const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const Task = require('../models/task')
const User = require('../models/user')
const mongoose = require('mongoose')
const jsonParser = bodyParser.json()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../validation')

router.post('/register', async (req, res) => {
    //validate email and password
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error)

    //check if email is exist
    const isExist = await User.findOne({email: req.body.email})
    if(isExist) return res.status(400).send("Email already exists")

    //Hash
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    //create new user
    const user = new User({
        email: req.body.email,
        password: hashPassword
    })

    try {
        const newUser = await user.save()
        res.status(201).send({id: newUser._id})
    } catch (err) {
        return res.status(400).send(err)
    }

})

router.post('/login', async (req, res) => {
    //validate email and password
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error)

    //check if email exist in db
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("Wrong email")   

    //check password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send("Wrong password")

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

    // console.log(token)
    // console.log(user._id)
    // const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    // console.log(decoded)

    res.header('auth-token', token).send(token)
})

module.exports = router