const express = require('express')
const { uploadFile, uploadFileToCloudinary } = require('../Controllers/upload')
const uploadRouter = express.Router()

uploadRouter.post('/upload', uploadFile, uploadFileToCloudinary)

module.exports = uploadRouter