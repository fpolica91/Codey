function socket(io) {
    io.on('connection', (socket) => {
        console.log('A user connected')
        socket.on('new message', (msg) => {
            const data = {
                message: msg.message,
                username: msg.username,
                date: Date.now()
            }
        })
    })
}

module.exports = socket