const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const Room = require('../models/Room')




router.get('/chats', (req, res, next) => {
    res.render('Chat/chatroom')
})


module.exports = router;