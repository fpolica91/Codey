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
    }).then(lobby => console.log(lobby))
})

router.get('/allchats', (req, res, next) => {
    if (req.user) {
        Lobby.find()
            .then(lobby => {
                let userLobbies = lobby.map(userLobbie => {
                    if (userLobbie.creator.equals(req.user._id)) {
                        return userLobbie
                    }
                })
                res.render('userviews/lobby', { userLobbies })
            })
    }
})


router.get('/userChats/:id', (req, res, next) => {
    Lobby.findById(req.params.id)
        .then(lobby => res.render("Chat/userChats/userRoom"))
})



module.exports = router