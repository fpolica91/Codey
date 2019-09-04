const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    message: String,
    // lobby: [{ type: Schema.Types.ObjectId, ref: "Lobby" }]
    // sender: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },

  {
    timestamps: true
  }
);

const Room = mongoose.model('Room', roomSchema)
module.exports = Room