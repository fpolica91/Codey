
const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const Room = require('../../models/Room')


router.route("/history").get((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    mongoose.connect('mongodb://localhost/undefined', { useNewUrlParser: true })
        .then(db => {
            let data = Room.find({ message: "Anonymous" });
            Room.find({}).then(chat => {
                res.json(chat);
            });
        });
});


module.exports = router;