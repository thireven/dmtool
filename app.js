const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config');
const reload = require('reload');

const routes = config.get('routes');
const navigation = config.get('navigation');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.navigation = navigation;
  res.locals.originalUrl = req.originalUrl;
  res.locals.baseLinkUrl = '';
  if (req.method === 'GET' && req.originalUrl.indexOf('/room/') > -1) {
    const matches = req.originalUrl.match(new RegExp('\/room\/([^\/]+)'));
    res.locals.baseLinkUrl = `/room/${matches[1]}`;
  }
  next();
})

routes.forEach((route) => {
  app.use(route.uri, require(`./routes/${route.file}`));
});

reload(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
