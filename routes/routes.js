const express = require('express')
const Router = express.Router()
const validator = require('../config/validator')

const usersControllers = require ('../controllers/userControllers')
const { SignUp, SignIn } = usersControllers

Router.route('/users/auth/signup').post(SignUp)
Router.route('/users/auth/sigIn').post(SignIn)

module.exports = Router


