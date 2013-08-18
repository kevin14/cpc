/*
* 处理用户的相关操作 登陆 注册 等
*/

//用户登陆
exports.login = function(req, res){
	renderData = {
		title: '登陆校园酷',
	}
	res.render('login.ejs',renderData);
};

//用户注册
exports.reg = function(req,res){
	renderData = {
		title: '开始校园酷生活',
	}
	res.render('reg.ejs',renderData);
}

//切换用户的所在学校
exports.changeschool = function(req,res){
	renderData = {
		title: '选择学校',
	}
	res.render('changeschool.ejs',renderData);
}

