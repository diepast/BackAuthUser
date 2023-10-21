const express = require('express')
const Router = express.Router()

const usersControllers = require ('../controllers/userControllers')
const { SignUp } = usersControllers

Router.route('/users/auth/signup').post(SignUp)
module.exports = Router


