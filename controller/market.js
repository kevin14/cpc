
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
		title: '校园酷-校园市场',
		oUrl:'/market'
	}
	req.session.cookie.originalMaxAge = 3600*24*7;
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
		staticUrl:settings.staticUrl,
		title:'物品详细页面'
	}
	res.render('market/good.ejs',renderData);
}

//物品发布页
exports.fabu = function(req,res){
	renderData = {
		staticUrl:settings.staticUrl,
		title:'发布一件物品',
		username:'kevin14',
		oUrl:null
	}
	res.render('market/fabu.ejs',renderData);
}

exports.fabuSubmit = function(req,res){
	var new_good_data = {
		uid:'14',
		gname:"aaa",
		gdesc:"bbbb",
		gprice:'14',
		mobile:'13764656676',
		status:1,
		place:33221,
		browser_num:0,
		classify:2
	}

	var new_good = new Model_market(new_good_data);
	new_good.create(function(data){
		// if (data.affectedRows) {
		// 	console.log("success!");
		// 	res.send("ok submit succeed!");
		// };
		console.log(data);
		res.send("ok submit succeed!");
	});
	
}