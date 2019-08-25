const express = require('express')
const router = express.Router()


router.get('/chats', (req, res, next) => {
    res.render("Chat/chatroom")
})

router.get('/compiler', (req, res, next) => {
    res.render("Chat/compiler")
})

module.exports = router;