var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser')
const hbs = require('hbs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const friendRouter = require('./routes/friends');
const chatroom = require('./routes/chatroom')
const socket = require('./socket/socket');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const User = require('./models/User');
const CodeAPI = require('./routes/APIS/codeAPI')

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/undefined', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

var app = express()
app.io = require("socket.io")()
socket(app.io)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  //res.setHeader("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(session({
  secret: "Hello world",
  resave: true,
  saveUninitialized: true
}))


//Middleware configuration for passport use
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err) }
    cb(null, user);
  });
});

app.use(flash());

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }


    return next(null, user);
  })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errorMessage = req.flash('error');
  res.locals.successMessage = req.flash('success');
  next();

})


//ROUTES
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', friendRouter);
app.use('/', chatroom);
app.use('/', CodeAPI)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
