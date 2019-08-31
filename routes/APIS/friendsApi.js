const express = require('express')
const router = express.Router()
const User = require('../../models/User')



router.get('/histogram', (req, res, next) => {
    User.findById(req.user._id)
        .then(user => {
            User.getFriends(user, function (err, friendship) {
                res.json(friendship)
            })
        })
})



module.exports = router