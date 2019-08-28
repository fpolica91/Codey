const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        minlength: 4,
        unique: true
    },
    password: {
        type: String,
        minlength: 5
    },
    email: {
        type: String,

    },
    is_active: {type: Boolean, default: false}
}) 


const User = mongoose.model('User', userSchema);

module.exports = User;