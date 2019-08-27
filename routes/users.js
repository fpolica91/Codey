const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport')

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('userviews/signup');
});

router.post('/signup', function(req, res, next){

  let theUsername = req.body.username;
  let thePassword = req.body.password;

  if( !theUsername || !thePassword){
    req.flash('error', 'please provide username and password it seems you have forgotten one or both')
    res.render('/signup')
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(thePassword, salt);

  User.create({
    username: theUsername,
    password: hashedPassword
  })
  .then(() => {
    res.redirect('/')
  })
  .catch((err) => {
next(err)
  })
})

router.get('/login', function(req, res, next){
  res.render('userviews/login')
})
module.exports = router;
