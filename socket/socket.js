function socket(io) {
    io.on('connection', (socket) => {
        console.log('A user connected')
        socket.on('chat message', (msg) => {
            socket.broadcast.emit("received", {
                message: msg
            })
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