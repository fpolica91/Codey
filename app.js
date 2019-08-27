var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const hbs = require('hbs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const chatroom = require('./routes/chatroom')
const socket = require('./socket/socket');

mongoose
  .connect('mongodb://localhost/undefined', {useNewUrlParser: true})
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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  //res.setHeader("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use('/', indexRouter);
app.use('/', usersRouter);

app.use('/chats', chatroom);

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
