var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var api = require('./routes/api');
var routes = require('./routes/index');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//连接数据库
var dbURL = 'mongodb://127.0.0.1:27017/newIdoc';
mongoose.connect(dbURL);

//储存session到mongodb
app.use(session({
  secret: 'newIDocumnet',
  store: new mongoStore({
    url: dbURL,
    collection: 'sessions',
    auto_reconnect: true
  })
}))

app.use(function (req, res, next) {
  var error = req.flash('error');
  var success = req.flash('success');
  res.locals.error = error.length ? error : null;
  res.locals.success = success.length ? success : null;
  next();
});

app.use('/api/', api);
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port = process.env.PORT || 3002;
app.listen(port);

console.log('idoc started on port' + port);