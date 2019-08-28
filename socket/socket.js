const mongoose = require('mongoose')
const Room = require('../models/Room')
const Code = require('../models/Code')


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

        socket.on('send-code', (code) => {
            socket.broadcast.emit('code-message', code)
            Code.create({
                code: code
            }).then(code => console.log(code))
                .catch(err => next(err))
        })

        // socket.on('message', (data) => {
        //     socket.broadcast.emit('received', {
        //         data
        //     })
        // })

        socket.on('disconnect', data => {
            console.log('user disconnected')
        })
    })
}



module.exports = socket