const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    is_active: { type: Boolean, default: false }
})


const User = mongoose.model('User', userSchema);

module.exports = User;