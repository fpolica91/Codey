const express = require('express');
const router = express.Router();
const User = require('../models/User');

//SEARCH USERS
router.get('/searchUser', (req, res, next) =>{
res.render('friendviews/searchUserForm');
})

router.post('/searchUser', (req, res, next) => {
//User.find({username: {$ne: req.user}})
User.find({username: { $in: req.body.userToSearch}})
.then(theUser => {
    res.render('friendviews/listUser', {theUser} );
})
.catch((err) => console.log("An error just happened ", err))
})


//SHOW FRIENDLIST
router.get('/friendlist', (req, res, next) => {
    
})

module.exports = router;