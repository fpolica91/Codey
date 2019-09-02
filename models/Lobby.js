const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const lobbySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    topic: String,
    messages: [{ type: Schema.Types.ObjectId, ref: "Room" }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    code: [{ type: Schema.Types.ObjectId, ref: "Code" }],
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Lobby = mongoose.model("Lobby", lobbySchema)
module.exports = Lobby