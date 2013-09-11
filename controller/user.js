/*
* 处理用户的相关操作 登陆 注册 等
*/
var Model_user = require('../models/user'),
	Model_user_info = require('../models/userinfo'),
	crypto = require('crypto');

/*des加密解密算法*/
var cipheriv = function (en, code, data) {
    var buf1 = en.update(data, code),
    	buf2 = en.final();
    var r = new Buffer(buf1.length + buf2.length);
    buf1.copy(r); 
    buf2.copy(r, buf1.length);     
    return r;
}
//DES加密
var EncryptDES = function (data, key, vi) {      
	return data = cipheriv(crypto.createCipheriv('des', key, vi), 'utf8', data).toString('base64');
}
//DES解密
var DecryptDES = function (data, key, vi) {                        
	return cipheriv(crypto.createDecipheriv('des', key, vi), 'base64', data) .toString('utf8');
}
/*des加密解密算法end*/

//用户登陆页
exports.login = function(req, res){
	// console.log(crypto.createCipheriv('des', '111111').update('222222','utf8','hex').final('hex'));
	// var crypto = require("crypto");
	// var plaintext = new Buffer( '675A69675E5A6B5A', 'hex' ).toString( 'binary' );
	// console.log("plian:"+plaintext);
	// var key = new Buffer( '675A69675E5A6B5A', 'hex' );
	// console.log(key)
	// var iv = new Buffer(8);
	// iv.fill(0);
	// var cipher = crypto.createCipheriv("des", key, iv);
	// cipher.setAutoPadding(false);
	// var c = cipher.update( plaintext, 'binary', 'hex' );
	// c+=cipher.final('hex' );
	// console.log(c);


	// console.log("kevin is :")
	// console.log('kevin14'.toString('base64'))
	var md5 = crypto.createHash('md5');
	var password = md5.update('kevin14').digest('hex');
	console.log(crypto.createCipher('des', 'kevin14').update(password,'utf8').toString('base64'))
	console.log(crypto.createDecipher('des','kevin14').update('v15XEP1zSid14X8zm4NrJ6tD2ZRnbIlXWnAbZtnXM=','base64').toString('utf8') === password)
	// console.log(password)
	// // var key = new Buffer('12311111','binary');
	// var key = 'helloaaa';
	// console.log('key is :'+key);
	// // var vi = new Buffer('12311111','binary');
	// var vi = '12345678';
	// console.log('vi is :'+vi);
	// console.log(EncryptDES(password,key,vi));
	// console.log(DecryptDES('sFwmFJCfH4YCAjKJGpWp2UFwFhRBQ/wLWq86GNiwAZFHm6HfkYflbQ=1',key,vi) === password);

	renderData = {
		title: '登陆校园酷',
		username:'未登录',
		oUrl:'/login'
	}
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
			req.session.username = data[0].username;
			req.session.id = data[0].id;
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

