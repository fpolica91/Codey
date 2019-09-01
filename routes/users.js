const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport')

/* GET users listing. */
router.get('/signup', (req, res, next) => {
  res.render('userviews/signup');
});

router.post('/signup', (req, res, next) => {

  let theUsername = req.body.username;
  let thePassword = req.body.password;
  let theEmail = req.body.email;

  if (theUsername === "" || thePassword === "") {
    req.flash('error', 'please provide username and password it seems you have forgotten one or both')
    res.redirect('/signup')
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(thePassword, salt);

  User.create({
    username: theUsername,
    password: hashedPassword,
    email: theEmail
  })
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/login', (req, res, next) => {
  res.render('userviews/login')
})


router.post('/login', passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}))

// AUTH USING SLACK

router.get("/auth/slack", passport.authenticate("slack"))

router.get("/auth/slack/callback",
  passport.authenticate("slack", {
    successRedirect: "/chats",
    failureRedirect: "/login"
  })
)

//AUTH USING GITHUB
router.get("/auth/github", passport.authenticate('github'))

router.get("/auth/github/callback",
  passport.authenticate('github', {
    successRedirect: "/chats",
    failureRedirect: "/"
  })
)


router.get('/lobby/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      User.getFriends(user, function (err, friendship) {
        res.render('userviews/lobby', { user, friendship })
      })
    })
})




router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;
