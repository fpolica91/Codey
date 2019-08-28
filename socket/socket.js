const mongoose = require('mongoose')
const Room = require('../models/Room')
const User = require("../models/User")

function socket(io) {
    io.on('connection', (socket) => {
        console.log('A user connected')
        socket.on('chat message', (msg) => {
            socket.broadcast.emit("received", {
                message: msg
            })

            Room.create({
                sender: "Anonymous",
                name: "Room Name",
                message: msg
            }).then(data => console.log(data))
                .catch(err => next(err))
        })

        socket.on('send-code', message => {
            socket.broadcast.emit('code-message', message)
        })

        socket.on('message', (data) => {
            socket.broadcast.emit('received', {
                data
            })
        })

        socket.on('disconnect', data => {
            console.log('user disconnected')
        })
    })
}



module.exports = socket