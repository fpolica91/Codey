const mongoose = require('mongoose');
const friends = require('mongoose-friends');
const Schema = mongoose.Schema;
const Joi = require('joi')

const userSchema = new Schema({
    username: {
        type: String,
        minlength: 4,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    is_active: { type: Boolean, default: false },
    githubID: String,
    slackID: String,
},
    { timestamps: true }
)

function validateUser(user) {
    const schema = {
        username: Joi.string()
            .min(4)
            .max(20)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required()
    }
    return Joi.validate(user, schema)
}

userSchema.plugin(friends({ pathName: "friends" }))
const User = mongoose.model('User', userSchema);

module.exports = User;
module.validate = validateUser