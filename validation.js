const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    
    const joiOption = {allowUnknown: true}

    return schema.validate(data, joiOption)
}    

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    
    const joiOption = {allowUnknown: true}

    return schema.validate(data, joiOption)
}    

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation