/*
* 处理用户的相关操作 登陆 注册 等
*/
var Model_user = require('../models/user'),
	Model_user_info = require('../models/userinfo'),
	crypto = require('crypto');

//用户登陆页
exports.login = function(req, res){
	renderData = {
		title: '登陆校园酷',
		username:'未登录'
	}
	res.render('login.ejs',renderData);
};

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
				schoolid : 0//0代表为选择学校
			}
			var userinfo = new Model_user_info(info);
			userinfo.create(function(rs){
				console.log(rs);
				res.redirect('/change_your_school');
			})
		};
	});
}

//登陆
exports.login_in = function(req,res){
	var md5 = crypto.createHash('md5');
	var password = md5.update(String(req.body.password)).digest('hex');

	var login_data = {
		'email' : req.body.email,
		'password' : password
	};
	Model_user.user_login(login_data.email,function(data){
		if (data.length > 0 && data[0].password == login_data.password){
			req.session.username = data[0].username;
			req.session.id = data[0].id;
			res.redirect('/market');
		}else{
			console.log("用户名或者密码错误")
			res.redirect('/login');
		}
	});
	
}

