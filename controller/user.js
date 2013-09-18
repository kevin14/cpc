/*
* 处理用户的相关操作 登陆 注册 等
*/
var Model_user = require('../models/user'),
	Model_user_info = require('../models/userinfo'),
	crypto = require('crypto'),
	redis = require('redis');//我将在正式部署的时候安装redis

/*des加密解密算法 由于此算法很坑爹  暂时不用这个算法*/
// var cipheriv = function (en, code, data) {
//     var buf1 = en.update(data, code),
//     	buf2 = en.final();
//     var r = new Buffer(buf1.length + buf2.length);
//     buf1.copy(r); 
//     buf2.copy(r, buf1.length);     
//     return r;
// }
// //DES加密
// var EncryptDES = function (data, key, vi) {      
// 	return data = cipheriv(crypto.createCipheriv('des', key, vi), 'utf8', data).toString('base64');
// }
// //DES解密
// var DecryptDES = function (data, key, vi) {                        
// 	return cipheriv(crypto.createDecipheriv('des', key, vi), 'base64', data) .toString('utf8');
// }
/*des加密解密算法end*/

//用户登陆页
exports.login = function(req, res){

	var md5 = crypto.createHash('md5');
	var password = md5.update('kevin14').digest('hex');

	res.send({
		"ps:":ps,
		"长度：":password.length,
		"密码：":password,
		"加密：":crypto.createCipher('des', 'kevin14').update(password,'utf8','base64'),
		"解密：":crypto.createDecipher('des','kevin14').update('R/v15XEP1zSid14X8zm4NrJ6tD2ZRnbIlXWnAbZt','base64','utf8'),
		"解密长度：":crypto.createDecipher('des','kevin14').update('R/v15XEP1zSid14X8zm4NrJ6tD2ZRnbIlXWnAbZt','base64','base64').length
	})
	
	renderData = {
		title: '登陆校园酷',
		username:'未登录',
		oUrl:'/login'
	}
	// res.send("ok")
	res.render('login.ejs',renderData);
}

//用户注册页
exports.reg = function(req,res){
	renderData = {
		title: '开始校园酷生活',
		username:'未登录'
	}
	res.render('reg.ejs',renderData);
}

//切换用户的所在学校页
exports.changeschool = function(req,res){
	renderData = {
		title: '选择学校',
		username:'未登录'
	}
	res.render('changeschool.ejs',renderData);
}

//注册录入
exports.reg_in = function(req,res){
	//一旦digest被调用 那么md5这个实例将会被清空 因此 每次都需要实例化一下 这的确很令人费解
	var md5 = crypto.createHash('md5');
	var password = md5.update(String(req.body.password)).digest('hex');

	var ip = req.connection.remoteAddress;
	var user = {
		username:req.body.username,
		email:req.body.email,
		password:password,
		ip:ip
	}
	var newUser = new Model_user(user);
	newUser.create(function(data){
		if (data.affectedRows) {
			var info = {
				uavatar : "http://localhost:3000/media/market/2013/8/avatar.jpg",
				gender : 3,
				schoolid : 0//0代表未选择学校
			}
			var userinfo = new Model_user_info(info);
			userinfo.create(function(rs){
				res.redirect('/change_your_school');
			})
		};
	});
}

//登陆 登陆操作得到用户当前页面的url 刷新cookie之后再rediect到之前的页面
exports.login_in = function(req,res){

	var md5 = crypto.createHash('md5');
	var password = md5.update(String(req.body.password)).digest('hex');

	var login_data = {
		'email' : req.body.email,
		'password' : password
	};
	Model_user.user_login(login_data.email,function(data){
		if (data.length > 0 && data[0].password == login_data.password){
			// req.session.username = data[0].username;
			var sid_setter = crypto.createHash('md5').update(String(Math.ceil(Math.random()*100000000))+data[0].username).digest('hex');
			console.log('sid_setter is :'+sid_setter)
			req.session.sid = sid_setter;
			res.redirect('/market');
		}else{
			console.log("用户名或者密码错误")
			res.redirect('/login');
		}
	});
	
}

//登出 登出操作得到用户当前页面的url 删除cookie之后再rediect到之前的页面
exports.log_out = function(req,res){
	var originUrl = req.query.oUrl;
	req.session.username = null;
	res.clearCookie('username')
	res.redirect(originUrl);
}

