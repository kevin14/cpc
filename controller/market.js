
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
		title: '校园大卖场',
	}
	if (req.session.username == undefined) {
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
		title:'发布一件物品'
	}
	res.render('market/fabu.ejs',renderData);
}