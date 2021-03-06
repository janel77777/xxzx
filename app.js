'use strict';

var domain = require('domain');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var cece = require('./routes/cece');
var wx = require('./routes/wxrouter');
var api = require('./routes/api');
var question = require('./routes/question');

global.mongoose = require("mongoose");
global.db = mongoose.connect("mongodb://localhost:27017/xxzx");

var astrolabeCtl=require('./Server/Controller/astrolabeController');

var app = express();

astrolabeCtl.InitAstrolabeAction();
//initializationDB.loadInitialization();
// 设置 view 引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

//using session configation
app.use(session({
  secret: 'asdfghjkldsdspoiuytrewqzxcvbnmlkjhfdwgewerewgfsdvgethty' // 建议使用 128 个字符的随机字符串
  ,cookie: { maxAge: 60 *60 * 1000 * 2 }
}));

app.use(function(req, res, next){

  req.session._garbage = Date();

  req.session.touch();

  next();

});

// 使用 LeanEngine 中间件
// （如果没有加载云代码方法请使用此方法，否则会导致部署失败，详细请阅读 LeanEngine 文档。）
// app.use(AV.Cloud);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// 未处理异常捕获 middleware
app.use(function(req, res, next) {
  var d = null;
  if (process.domain) {
    d = process.domain;
  } else {
    d = domain.create();
  }
  d.add(req);
  d.add(res);
  d.on('error', function(err) {
    console.error('uncaughtException url=%s, msg=%s', req.url, err.stack || err.message || err);
    if (!res.finished) {
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json; charset=UTF-8');
      res.end('uncaughtException');
    }
  });
  d.run(next);
});

app.get('/', function(req, res) {

  res.render('index', {
    currentTime: new Date()
  });
});

app.get('/jssdk',function(req,res){
  res.render('jssdk');
});

//weixin
app.use('/wx', wx);
app.use('/api',api);

// 可以将一类的路由单独保存在一个文件中
app.use('/cece', cece);
app.use('/question', question);

// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) { // jshint ignore:line
    var statusCode = err.status || 500;
    if (statusCode === 500) {
      console.error(err.stack || err);
    }
    res.status(statusCode);
    res.render('error', {
      message: err.message || err,
      error: err
    });
  });
}

// 如果是非开发环境，则页面只输出简单的错误信息
app.use(function(err, req, res, next) { // jshint ignore:line
  res.status(err.status || 500);
  res.render('error', {
    message: err.message || err,
    error: {}
  });
});

module.exports = app;
