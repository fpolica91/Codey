const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Lobby = require('../models/Lobby')
const User = require('../models/User')


router.use((req, res, next) => {
    if (!req.user) {
        res.redirect("/login")
    }
    next()
})

router.post('/create/chat', (req, res, next) => {
    const { name, topic, friends } = req.body
    Lobby.create({
        name,
        topic,
        friends,
        creator: req.user.username
    }).then(userLobbies => {
        res.redirect('/allchats')
    })
})

router.get('/allchats', (req, res, next) => {
    Lobby.find({ $or: [{ friends: { $in: req.user.username } }, { creator: { $eq: req.user.username } }] })
        .then(lobby => {
            let userLobbies = lobby.map(lobbie => {
                return lobbie;
            })
            res.render('userviews/userlist', { userLobbies })
        }).catch(err => next(err))
})





router.get('/userChats/edit/:id', (req, res, next) => {
    Lobby.findById(req.params.id)
        .then(lobby => {
            User.findOne({ username: lobby.creator })
                .then(user => {
                    User.getFriends(user, function (err, friendship) {
                        res.render("Chat/userChats/editRoom", {
                            friendship,
                            lobby
                        })
                    })
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
})

// "/chatroom/{{lobby._id}}/edited"

router.post('/chatroom/:id/edited', (req, res, next) => {
    Lobby.findByIdAndUpdate(req.params.id, req.body)
        .then(res.redirect('/allchats'))
        .catch(err => next(err))
})





router.get('/userChats/:id', (req, res, next) => {
    Lobby.findById(req.params.id)
        .then(lobby => {
            if (lobby.creator === req.user.username) {
                res.render("Chat/userChats/userRoom", { lobby: lobby, layout: false, user: req.user.username })
            } else {
                res.render("Chat/userChats/userRoom", { lobby: lobby, layout: false })
            }
        })
        .catch(err => console.log("Errr while getting the chat ", err));
})


router.post('/removeFriendChat/:name', (req, res, next) => {
    console.log(req.params.name)
    Lobby.findOneAndUpdate({ friends: { $in: req.params.name } }, {
        $pull: {
            friends: req.params.name
        }
    }).then(res.redirect('back'))
        .catch(err => next(err))
})


module.exports = router