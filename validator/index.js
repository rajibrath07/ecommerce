const user = require("../models/user")
exports.userSignupValidator = (req,res,next)=>{
    req.check('name', 'Name is required').notEmpty()
    req.check('email','Email must be between 3 to 32 characters')
        .matches('/.+\@.+\..+/')
        .withmessage('Email must conntain @')
        .isLength({
            min:4,
            max:32
        })
    req.check('password','Password is required').notEmpty()
    req.check('password')
        .isLength({min:6})
        .withmessage('Password must be contain 6 characters')
        .matches('/\d/')
        .withmessage('Password must contain a number')

        const errors = req.validationErrors()
        if(errors){
            const firstError = errors.map(error => error.msg)[0]
            return res.status(400).json({ error: firstError})
        }
        next()

}