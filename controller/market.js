
/*
 * GET users listing.
 */
var Model_market = require('../models/market');
var renderData = {};
var settings = require('../settings.js');
// module.exports = Controller_market;

//首页
exports.index = function(req,res){
	renderData = {
		staticUrl:settings.staticUrl,
		title: '校园大卖场',
		oUrl:'/market'
	}
	req.session.cookie.originalMaxAge = 3600*24*7;
	console.log(req.session.cookie.originalMaxAge)
	if (!req.session.hasOwnProperty('username')) {
		renderData.username = "未登录";
	}else{
		renderData.username = req.session.username;
	}

	res.render('market/index.ejs',renderData);
}

//物品详细页
exports.single = function(req,res){
	renderData = {
		title:'物品详细页面'
	}
	res.render('market/good.ejs',renderData);
}

//物品发布页
exports.fabu = function(req,res){
	renderData = {
		title:'发布一件物品',
		username:'kevin14',
		oUrl:null
	}
	res.render('market/fabu.ejs',renderData);
}

exports.fabuSubmit = function(req,res){
	res.send("ok submit succeed!");
}