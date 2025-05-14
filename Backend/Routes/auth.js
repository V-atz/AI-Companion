const express = require('express')
const { handleUserSignUp, handleUserLogin } = require('../Controllers/auth')
const authRoute = express.Router()

//sign-up
authRoute.post('/signup', handleUserSignUp)
authRoute.post('/login', handleUserLogin)

module.exports = authRoute