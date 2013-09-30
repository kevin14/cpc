/*
* 处理公共的操作 404报错等
*/

//404页面
exports.pageNotFound = function(req, res){
	renderData = {
		title: '页面未找到',
	}
	res.render('404.ejs',renderData);
};

