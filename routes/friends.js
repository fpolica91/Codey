const express = require('express');
const router = express.Router();
const User = require('../models/User');

//SEARCH USERS
router.get('/searchUser', (req, res, next) => {
    // console.log("The user ID is " + req.user_.id)
    res.render('friendviews/searchUserForm');
})

router.get('/searchUser', (req, res, next) => {
    User.find({ username: { $eq: req.body.userToSearch } })
        .then(theUser => {
            if (theUser.length === 0) {
                req.flash('error', 'There is no username with that name');
                res.redirect('/searchUser');
            } else {
                res.render('friendviews/searchUserForm', { theUser });
            }
        })
        .catch((err) => console.log("An error just happened ", err))
})


//SHOW FRIENDLIST
router.get('/friendlist', (req, res, next) => {
    res.render('friendviews/friendList');
})

// router.post('/AddNewFriend', (req, res, next) => {
//     console.log(req.body);
//    // User.requestFriend(req.user._id, )
// })


//VERSION 2
router.post('/AddNewFriend', (req, res, next) => {
    // let yourUser = req.user
    // User.find({ username: { $eq: req.body.userToAdd } })

    User.findOne({ username: req.body.name })
        .then(user => {
            console.log(user)
            // if (!user.length) {
            //     req.flash('error', 'There is no username with that name');
            //     res.redirect('/searchUser');
            // } else {
            User.requestFriend(req.user._id, user._id);
            res.render('friendviews/friendList');
            // }
        })
        .catch((err) => console.log("An error just happened ", err))
})


module.exports = router;