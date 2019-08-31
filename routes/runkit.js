const express = require('express')
const router = express.Router()


router.route('/runkit').get((req, res, next) => {
    res.render('runkit')
})





module.exports = router