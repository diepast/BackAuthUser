const joi = require('joi')

const validator = (req, res, next) =>{ 
     const schema = joi.object({
        fullName: joi.string()
                .required(),
        email: joi.string()
                .email({minDomainSegments: 2})
                .required()
                .messages({
                    'string.email': 'Please enter a valid email address'
                }),
        password: joi.string()
                .min(8)
                .max(30)
                .pattern(new RegExp('^[a-zA-Z0-9]'))
                .required()
                .messages({
                    'string.min': 'Password must contain at least eight characteres',
                    'string.max': 'Password must contain at max 30 characteres',
                    'string.pattern.base': 'The password must contain uppercase, lowercase and numbers'
                }),
                from: joi.string()
                .required(),
                aplication: joi.string()
                .required(),

     })
    const validation = schema.validate(req.body.userData, {abortEarly: false})
     if(validation.error){
         return res.json({
            success: false,
            from: 'validator',
            message: validation.error.details
        })
    }
    next()
}
module.exports = validator