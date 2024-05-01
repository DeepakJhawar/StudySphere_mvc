var express = require('express');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");


var path = require('path');
const flash = require("connect-flash");

var adminRouter = require('./routes/admin');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactsRouter = require('./routes/contact');

const collection = require("./models/userModel.js");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: "xyz",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE,
    }),
  })
);
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/', usersRouter);
app.use('/', contactsRouter);

module.exports = app;
