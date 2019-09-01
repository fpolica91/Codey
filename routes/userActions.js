const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Lobby = require('../models/Lobby')
const User = require('../models/User')

// router.get("/lobbyList", (req, res, next) => {
//     Lobby.find()
//         .then(lobby => {
//             User.find()
//                 .then(user => {
//                     if (lobby.creator.equals(user._id)) {
//                         res.json(lobby)
//                     }
//                 })
//         })
// })



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




module.exports = router