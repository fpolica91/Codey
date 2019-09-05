const mongoose = require('mongoose')
const Room = require('../models/Room')
const Code = require('../models/Code')
const Lobby = require('../models/Lobby')
const User = require('../models/User')
const url = require('url')


function socket(io) {
    let newCode;

    io.on('connection', function (socket) {
        let theUrl = socket.handshake.headers.referer;
        // console.log(theUrl);
        var trueUrl = url.parse(theUrl, true);
        // console.log(trueUrl.pathname);
        let hUrl = trueUrl.pathname.split('/');
        //  console.log(hUrl[2]);
        let realUrl = hUrl[2];

        socket.on('chat message', function (msg, theUser) {
            socket.join(`${realUrl}`)
            socket.broadcast.to(`${realUrl}`).emit("received", { message: msg });
            let chat = new Room({
                message: msg,
                sender: theUser
            }

            )
            chat.save(function (err) {
                if (err) {
                    return handleError(err)
                }
            })

            Lobby.findByIdAndUpdate(`${realUrl}`, {
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
            newCode.save((err) => {
                if (err) return handleError(err)
            })
        })
    })
}



//==========================WORKING VERSION=======================================
// function socket(io) {
//     let newCode;



//     io.on('connection', function (socket, id) {
//         socket.on('chat message', function (msg, id) {
//             socket.join(id)
//             socket.broadcast.to(id).emit("received", { message: msg, id });
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










module.exports = socket
