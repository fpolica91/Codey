const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: String,
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
      }]
})