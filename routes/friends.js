const express = require('express');
const router = express.Router();
const User = require('../models/User');

//SEARCH USERS
router.get('/searchUser', (req, res, next) =>{
    console.log(req.query.userToSearch);
    if(req.query.userToSearch === undefined){
        res.render('friendviews/searchUserForm');
    }else{
    User.find({username: { $eq: req.query.userToSearch}})
    .then(theUser => {
        if(theUser.length === 0){
            req.flash('error', 'There is no username with that name');
            res.redirect('/searchUser');
        }else{
            res.render('friendviews/searchUserForm', {theUser} );
        }
    })
    .catch((err) => console.log("An error just happened ", err))
}
})

//SHOW FRIENDLIST

router.get('/friendlist', (req, res, next) => {
    console.log("the user ID is " + req.user._id)
    User.findById(req.user._id)
    .then(theUser => {
       User.getFriends(theUser, function(err, friendship){
          // console.log(friendship);
        res.render('friendviews/friendList', {theUser, friendship});
       })
       
    })
    .catch((err)=> console.log("An err just happened", err))
       // User.getFriends(req.user._id);
   
})

// router.post('/AddNewFriend', (req, res, next) => {
//     console.log(req.body);
//    // User.requestFriend(req.user._id, )
// })


//VERSION 1
router.post('/AddNewFriend', (req, res, next) => {
    User.findOne({ username: req.body.name })
        .then(user => {
            console.log(user)
            User.requestFriend(req.user._id, user._id);
            res.render('friendviews/friendList');
            // }
        })
        .catch((err) => console.log("An error just happened ", err))
})

// //VERSION 2
// router.post('/AddNewFriend', (req, res, next) => {
//     let yourUser = req.user._id;
//     console.log("This is " + req.query.userToAdd);
//     // User.findById(req.query.userToAdd)
//     // .then(theUser => {
//     //     console.log(theUser);
//         // if(theUser.length === 0){
//         //     req.flash('error', 'There is no username with that name');
//         //     res.redirect('/searchUser');
//         // }else{
//         //     User.requestFriend(yourUser, theUser._id);
//         //     res.render('friendviews/friendList');
//         // }
//     // })
//     // .catch((err) => console.log("An error just happened ", err))
//     })


module.exports = router;