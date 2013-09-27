
var express = require('express');
var market = require('./controller/market.js');
var club = require('./controller/club.js');
var user = require('./controller/user.js');
var common = require('./controller/common.js');
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
app.use(express.cookieParser());
app.use(express.session({ secret: "campuscool" }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(app.router);

// 在未找到更好的办法之前 路由配置暂时放在app.js文件里
//公共的route
app.get('/reg',user.reg);//注册頁
app.get('/login',user.login);//登陸頁
app.post('/user/login_in',user.login_in);//登陸驗證
app.get('/user/log_out',user.log_out);//登陸驗證
app.post('/user/reg_in',user.reg_in);//注册
app.get('/change_your_school',user.changeschool);//切換学校


//属于market的route
app.get('/',market.index);
app.get('/market',market.index);
app.get('/market/fabu',market.fabu);
app.get('/market/single',market.single);
app.post('/market/fabuSubmit',market.fabuSubmit);
//404页面 希望能用服务器去解决这件事情 因为这里还把css js等静态文件过滤了一下 不好不好
// app.get('/*',common.pageNotFound);

http.createServer(app).listen(app.get('port'), function(){
  console.log('cpc server listening on port ' + app.get('port'));
});


