/*
 * GET users listing.
 */
var Model_market = require('../models/market');
var Model_school = require('../models/school');
var Model_classify = require('../models/classify');
var renderData = {};
var settings = require('../settings.js');
var fs = require('fs');
var im = require('node-imagemagick');
// module.exports = Controller_market;

//首页
exports.index = function(req, res) {

	renderData = {
		staticUrl: settings.staticUrl,
		title: '校园酷-校园市场',
		oUrl: '/market',
		classify:0
	}
	//这里得到首页物品list的数据
	Model_market.getCountByClass(0,0,function(count) {
		Model_classify.getAllClassify(function(cData){
			renderData.cData = cData;
			renderData.dataLength = count;
			res.render('market/index.ejs', renderData);
		});
		
	})
	// req.session.cookie.originalMaxAge = 3600*24*7;
	// if (!req.session.hasOwnProperty('username')) {
	// 	renderData.username = "未登录";
	// }else{
	// 	renderData.username = req.session.username;
	// }

	// res.render('market/index.ejs',renderData);
}

//左侧边栏选择分类
exports.chooseClass = function(req,res){
	var classify = Number(req.query.cid);
	renderData = {
		staticUrl: settings.staticUrl,
		title: '校园酷-校园市场',
		oUrl: '/market',
		classify:classify
	}
	Model_market.getCountByClass(classify,0,function(count) {
		Model_classify.getAllClassify(function(cData){
			renderData.cData = cData;
			renderData.dataLength = count;
			res.render('market/index.ejs', renderData);
		});
		
	})
}

exports.chooseSchool = function(req,res){
	var schoolId = Number(req.query.schoolId);
	var pid = Number(req.query.pid);
	var classify = Number(req.query.classifyId);
	Model_market.getBySchool(schoolId,classify,32*(pid-1),32,function(data){
		res.send(data);
	})
}

//选择当前学校当前分类的数据
exports.chooseLocal = function(req,res){
	var school_id = Number(req.query.school_id);
	var classify_id = Number(req.query.classify_id);
	Model_market.getCountByClass(classify_id,school_id,function(count){
		res.send({count:count});
	});
}

//物品详细页
exports.single = function(req, res) {
	renderData = {
		staticUrl: settings.staticUrl,
		title: '物品详细页面'
	}
	res.render('market/good.ejs', renderData);
}

//物品发布页
exports.fabu = function(req, res) {
	renderData = {
		staticUrl: settings.staticUrl,
		title: '发布一件物品',
		username: 'kevin14',
		oUrl: null
	}
	res.render('market/fabu.ejs', renderData);
}


//TODO 截图功能需要完善
exports.fabuSubmit = function(req, res) {

	var target_path = "",
		dstPath = "";

	if (req.files.pic.name != "") {
		var date = new Date();
		var tmp_path = req.files.pic.path;
		var pic_ran = date.getTime() + Math.floor(Math.random() * 100000).toString();
		var file_name = pic_ran + req.files.pic.name.slice(req.files.pic.name.length - 4);
		var pic_path = './public/media/market/' + date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/';
		dstPath = pic_path + pic_ran + "_small" + req.files.pic.name.slice(req.files.pic.name.length - 4);
		// 指定文件上传后的目录 - 示例为"images"目录。 
		target_path = pic_path + file_name;

		// 移动文件 并且裁减
		fs.rename(tmp_path, target_path, function(err) {
			if (err) throw err;
			im.resize({
				srcPath: target_path,
				dstPath: dstPath,
				width: 148
			}, function(err, stdout, stderr) {
				if (err) throw err;
				im.crop({
					srcPath: dstPath,
					dstPath: dstPath,
					width: 148,
					height: 148,
					quality: 1,
					gravity: "North"
				}, function(err, stdout, stderr) {
					if (err) throw err;
				});
			});
			// 删除临时文件夹文件, 
		});
	};
	var new_good_data = {
		uid: '14', //需要替换成session
		gname: req.body.gname,
		gdesc: req.body.gdesc,
		gprice: req.body.gprice,
		mobile: req.body.mobile,
		status: req.body.wanted,
		place: req.body.place, //替换成真正的place
		browser_num: 0,
		classify: req.body.classify, //替换成真正的classify
		gpic_url: target_path ? target_path.slice(9) : 'media/market/default/default.jpg', //去处./public 嘿嘿
		gpic_url_small: dstPath ? dstPath.slice(9) : 'media/market/default/default_small.jpg'
	};

	var new_good = new Model_market(new_good_data);
	new_good.create(function(data) {
		res.send("发布成功！...");
	});
}