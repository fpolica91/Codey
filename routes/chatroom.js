const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const Room = require('../models/Room')




router.get('/chats', (req, res, next) => {
    res.render('Chat/chatroom')
})


// THIS API RETRIEVES ALL THE MESSAGES FROM SERVER -> TEST WITH POSTMAN
// router.get('/jesus', (req, res, next) => {
//     Room.find({})
//         .then(chat => {
//             console.log(chat)
//             res.json(chat)
//         })
// })



module.exports = router;