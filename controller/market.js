
/*
 * GET users listing.
 */
var Model_market = require('../models/market');
var renderData = {};
var settings = require('../settings.js');
var fs = require('fs');
// module.exports = Controller_market;

//首页
exports.index = function(req,res){

	renderData = {
		staticUrl:settings.staticUrl,
		title: '校园酷-校园市场',
		oUrl:'/market'
	}

	//这里得到首页物品list的数据
	Model_market.get_good_list(0,48,function(data){
		renderData.goodList = data;
		// res.send(data);
		res.render('market/index.ejs',renderData);
	})

	
	// req.session.cookie.originalMaxAge = 3600*24*7;
	// if (!req.session.hasOwnProperty('username')) {
	// 	renderData.username = "未登录";
	// }else{
	// 	renderData.username = req.session.username;
	// }

	// res.render('market/index.ejs',renderData);
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
	var date = new Date();
	// console.log(req.files.pic);
	//rename文件名
	res.send(req.files);
	// var file_name = date.getTime()+Math.floor(Math.random()*100000).toString();

	// var tmp_path = req.files.thumbnail.path;
	// 指定文件上传后的目录 - 示例为"images"目录。 
	// var target_path = './public/media/market/'+ date.getFullYear().toString() + (date.getMonth()+1).toString() + req.files.thumbnail.name;
	// 移动文件
	// fs.rename(tmp_path, target_path, function(err) {
 //  	if (err) throw err;
 //  	// 删除临时文件夹文件, 
 //  	fs.unlink(tmp_path, function() {
 //   	if (err) throw err;
 //    	res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
 //  	});


	// var new_good_data = {
	// 	uid:'14',
	// 	gname:req.body.gname,
	// 	gdesc:req.body.gdesc,
	// 	gprice:req.body.gprice,
	// 	mobile:req.body.mobile,
	// 	status:1,
	// 	place:1,
	// 	browser_num:0,
	// 	classify:1
	// }

	// var new_good = new Model_market(new_good_data);
	// new_good.create(function(data){
	// 	// if (data.affectedRows) {
	// 	// 	console.log("success!");
	// 	// 	res.send("ok submit succeed!");
	// 	// };
	// 	console.log(data);
	// 	res.send(req.body.wanted);
	// });
}