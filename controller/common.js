/*
 * 处理公共的操作 404报错等
 */
var Model_school = require('../models/school');

//404页面
exports.pageNotFound = function(req, res) {
	renderData = {
		title: '页面未找到',
	}
	res.render('404.ejs', renderData);
};

exports.schoolChoose = function(req, res) {
	var areaId = req.query.id;
	if (areaId == '') {
		Model_school.getCity(function(data) {
			for(var i = 0 ;i < data.length ;i++){
				data[i].school_name = data[i].city;
			}
			res.send(data);
		});
	}else{
		Model_school.getList(areaId, function(data) {
			res.send(data);
		});
	}
}