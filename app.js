const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');

const indexRouter = require('./routes/index');

let app = express();
app.set("port", 7777);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/modules', express.static(__dirname + '/public/node_modules'));
app.use('/music', express.static(__dirname + '/public/temp'));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



http.createServer(app).listen(app.get('port'), () => {
  console.log('Server listening on port ' + app.get('port') + "\nPress CTRL+C to quit");
});


module.exports = app;
