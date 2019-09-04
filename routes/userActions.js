const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Lobby = require('../models/Lobby')
const User = require('../models/User')

router.post('/create/chat', (req, res, next) => {
    const { name, topic, friends } = req.body
    Lobby.create({
        name,
        topic,
        friends,
        creator: req.user._id
    }).then(userLobbies => {
        console.log(userLobbies)
    })
})

router.get('/allchats', (req, res, next) => {
    Lobby.find()
        .then(lobby => {
            let userLobbies = lobby.map(lobbie => {
                if (lobbie.creator.equals(req.user._id)) {
                    return lobbie
                }
            })
            res.render('userviews/userlist', { userLobbies })
        }).catch(err => next(err))
})



router.get('/mess', (req, res, next) => {
    Lobby.findById("5d6d868d22fae605d0531dad")
        .populate("messages")
        .exec((err, messages) => {
            res.json(messages)
        })
})


router.get('/userChats/:id', (req, res, next) => {
    Lobby.findById(req.params.id)
        .then(lobby => res.render("Chat/userChats/userRoom", lobby))
})


module.exports = router