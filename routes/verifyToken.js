const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports.checkLogin = function (req, res, next) {
    const token = req.header('auth-token')
    if(!token) return res.status(401).send("Please login")

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified;
        next()
    } catch (err) {
        res.status(400).send("Invalid Token")
    }
}

module.exports.checkAdmin = async function (req, res, next) {
    const userID = req.user._id;
    const thisUser = await User.findOne({_id: userID});
    const userRole = thisUser.role

    if(userRole != "admin") return res.status(403).send("Permission required")
    next()
}

