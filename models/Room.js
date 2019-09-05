const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    message: {
      type: String
    },
    sender: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true
  }
);

const Room = mongoose.model('Room', roomSchema)
module.exports = Room