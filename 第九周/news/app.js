var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var foreground = require('./routes/foreground'); //前台请求数据库数据
var ormMysql = require('./routes/ormMysql'); //后台请求数据库数据
var login = require('./routes/login'); //后台登陆
var backstage = require('./routes/backstage'); //后台管理页面

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//这里传入了一个密钥加session id
app.use(cookieParser('Fengziyu'));
//使用靠就这个中间件
app.use(session({
    secret: 'fengziyu',
    resave: false,
    saveUninitialized: true
}));


app.use('/', routes);
app.use('/users', users);
app.use('/orm', ormMysql);
app.use('/foreground', foreground);
app.use('/backstage', backstage);
app.use('/login', login);

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


module.exports = app;
