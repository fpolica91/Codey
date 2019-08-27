const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const Room = require('../models/Room')



router.get('/chats', (req, res, next) => {
    res.render('Chat/chatroom')

})

router.route('/getmessage').get((req, res, next) => {
    let data = Room.find({ message: "Anonymous" });
    Room.find({}).then(chat => {
        res.json(chat);
    });
})


module.exports = router;