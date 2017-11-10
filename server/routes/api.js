const express = require('express')
const UserController = require('../controller/dbHelper.js')
const router = express.Router()

UserController(router)

module.exports = router
