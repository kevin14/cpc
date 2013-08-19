/*
* 处理用户的相关操作 登陆 注册 等
*/
var Model_user = require('../models/user'),
	crypto = require('crypto');
var md5 = crypto.createHash('md5');
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
		title: '开始校园酷生活'
	}
	res.render('reg.ejs',renderData);
}

//切换用户的所在学校页
exports.changeschool = function(req,res){
	renderData = {
		title: '选择学校'
	}
	res.render('changeschool.ejs',renderData);
}

//登陆
exports.login_in = function(req,res){
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
			res.redirect('/reg');
		}
	});
	
}

