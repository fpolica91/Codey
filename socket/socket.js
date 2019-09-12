const mongoose = require('mongoose')
const Room = require('../models/Room')
const Code = require('../models/Code')
const Lobby = require('../models/Lobby')
const User = require('../models/User')
const url = require('url')
var http = require("http");

const users = {};

function socket(io) {
    let newCode;

    io.on('connection', function (socket) {

         //console.log(socket.client); //THIS PRINTS THE WHOLE SOCKET
         let theUrl = socket.handshake.headers.referer;
         // console.log(theUrl);
         var trueUrl = url.parse(theUrl, true);
         // console.log(trueUrl.pathname);
         let hUrl = trueUrl.pathname.split('/');
         //  console.log(hUrl[2]);
         let realUrl = hUrl[2];

       console.log("SERVER THIS");
       socket.on('set-user', function(data){
        users[socket.id] = data;
        console.log("HELLO WOLRD 2")
        console.log(users);
        // socket.emit('setSocketId', {theId: socket.id, name: data});
        // socket.emit('listOfUsers', users)
        socket.join(`${realUrl}`)
        io.in(`${realUrl}`).emit('listOfUsers', users);
       })
       
      





        socket.on('chat message', function (msg) {
       
           
        
            socket.broadcast.to(`${realUrl}`).emit("received", { message: msg.msg, sender: msg.sender});
            let chat = new Room({
                message: msg.msg,
                sender: msg.sender
            })
            chat.save().
            then(theChat => {
                console.log("Successfully saved ", theChat);
            })
            .catch((err) => console.log("An error happened while saving message, ", err));

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

        socket.on("kicked", (data) => {
            if (data == undefined || !data){
                return 
            } else{
                console.log("YOU WERE KICKED");
                console.log(data);
                console.log("THE USER WAS");
                console.log(io.sockets.connected[socket.id]);
                // io.sockets.connected[data].emit('exitChat', '/allChats'); 
                io.to(io.sockets.connected[data]).emit('exitChat', '/allChats');
            }
       
                })

        socket.on( 'disconnect', function() {
            console.log("DISCONNECTED, " + users[socket.id]);
            delete users[socket.id]
            console.log(users);
            });
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
