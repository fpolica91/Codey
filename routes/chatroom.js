const express = require('express')
const router = express.Router()


router.get('/chats', (req, res, next) => {
    res.render("Chat/chatroom")
})



module.exports = router;