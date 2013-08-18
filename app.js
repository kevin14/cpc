
var express = require('express');
var market = require('./controller/market.js');
var club = require('./controller/club.js');
var user = require('./controller/user.js');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(app.router);

// 在未找到更好的办法之前 路由配置暂时放在app.js文件里
//公共的route
app.get('/reg',user.reg);
app.get('/login',user.login);
app.get('/change_your_school',user.changeschool);

//属于market的route
app.get('/market',market.index);
app.get('/market/fabu',market.fabu);
app.get('/market/single',market.single);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

