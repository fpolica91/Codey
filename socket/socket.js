const mongoose = require('mongoose')
const Room = require('../models/Room')
const Code = require('../models/Code')
const Lobby = require('../models/Lobby')
const User = require('../models/User')

// const helper = require('../public/javascripts/userJavascripts/helper')
// let theLobby = helper.getId();


// function socket(io) {
//     io.on('connection', (socket) => {
//         console.log('A user connected')
//         socket.on('chat message', function (msg) {
//             socket.broadcast.emit("received", { message: msg });
//             Room.create({
//                 sender: "",
//                 name: "",
//                 message: msg
//             }).then(data => console.log(data))
//                 .catch(err => console(err))
//         })

//         socket.on('send-code', (code) => {
//             socket.broadcast.emit('code-message', code)
//             Code.create({
//                 code: code
//             }).then(code => console.log(code))
//                 .catch(err => next(err))
//         })
//         socket.on('disconnect', data => {
//             console.log('user disconnected')

//         })
//     })
// }







// function socket(io) {
//     let newCode;
//     io.on('connection', (socket) => {
//         console.log()
//         socket.on('chat message', function (msg, id) {
//             socket.broadcast.emit("received", { message: msg });
//             let chat = new Room({
//                 message: msg
//             })
//             chat.save()
//             Lobby.findByIdAndUpdate(id, {
//                 $push: {
//                     messages: chat,
//                     code: newCode
//                 }
//             }).then(data => console.log(data))
//         })

//         // END OF CHAT MESSAGES
//         socket.on('send-code', (code) => {
//             socket.broadcast.emit('code-message', code)
//             newCode = new Code({
//                 code: code
//             })
//             newCode.save()
//         })
//     })
// }



function socket(io) {
    let newCode;



    io.on('connection', function (socket, id) {
        socket.on('chat message', function (msg, id) {
            socket.join(id)
            socket.broadcast.to(id).emit("received", { message: msg, id });
            let chat = new Room({
                message: msg
            })
            chat.save()
            Lobby.findByIdAndUpdate(id, {
                $push: {
                    messages: chat,
                    code: newCode
                }
            }).then(data => console.log(data))
        })

        // END OF CHAT MESSAGES
        socket.on('send-code', (code) => {
            socket.broadcast.emit('code-message', code)
            newCode = new Code({
                code: code
            })
            newCode.save()
        })
    })
}










module.exports = socket
