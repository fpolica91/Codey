const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: {
        type: String,
        minlength: 5
    },
    is_active: {type: Boolean, default: false}
}) 


const User = mongoose.model('User', userSchema);

module.exports = User;