/**
 * REQUIREMENTS:
 * 
 *  - 1 express         : Middleware                                  - Express is middleware that lets us map API requests to the appropriate function to handle them also provides useful things like the express.json() request body parser that lets us parse data and info from requests
 *  - 2 morgan          : log formatter and maker
 *  - 3 cookie-parser   : cookie making, requesting and signing
 *  - 4 compression     : compress responses
 *  - 5 helmet          : http headers for added security             - (TO DO: Need more explanation on this, why do headers add safety) 
 *  - 6 http-errors     : error messages i guess?
 *  - 7 path            : utility for file and dir pathing
 */

require('dotenv').config({path: __dirname + '/.env'})
const express = require("express"); 
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var helmet = require('helmet');
var createError = require('http-errors');

var app = express();

// 1 parse requests of content-type - application/x-www-form-urlencoded can parse incoming Request Object if object, with nested objects, or generally any type. 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 2 morgan 
app.use(logger('dev'));
// 3 cookie-parser
app.use(cookieParser());
// 4 compression
app.use(compression());
// 5 helmet
app.use(helmet());

//database connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// static
app.use(express.static(path.join(__dirname, 'app', 'public')));

//views engine
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routing
//bezkoder version: require("./app/routes/customer.routes.js")(app);
app

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 6 error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
