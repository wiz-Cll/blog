var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compress = require( 'compression' );

var config = require('./config');
var routeRules = require('./backend/route');
var logger = require('./backend/base/log');

var app = express();


// 使用ejs解析引擎
app.set('view engine', 'jade');

// 视图文件都在/views
app.set('views', path.join(__dirname, 'views'));


// ~使用压缩~ 换用nginx的压缩服务
// Respense Header:
//      Content-Encoding:gzip
// compress() should have been included **Before** the static file server
// app.use( compress() );

// 参数解析, 文件上传
app.use( bodyParser() );
app.use( cookieParser() );

// 默认的js css等静态资源根目录
// ~添加缓存控制~ maxAge会导致浏览器不发出检查变更的请求,不添加该resHead
// var cacheTime = 7*24*60*60*1000;
// app.use( express.static( __dirname + '/public', { maxAge: cacheTime}) ) ;
app.use( express.static( __dirname + '/public') ) ;


routeRules.bind( app );
app.listen( config.port );


logger.info( 'app is listeing @ : ' + config.port );
