var db = require('./db');
var data = {},ctime,table_name = "cpc_goods";

function Good(good){
	this.table_name = "cpc_goods";
	this.uid = good.uid;
	this.gname = good.gname;
	this.gdesc = good.gdesc;//
	this.gprice = good.gprice;
	this.mobile = good.mobile;
	//this.status = good.status;状态 未售出 已售出等
	this.place = good.place;
	// this.browser_num = good.browser_num;浏览数
	this.classify = good.classify;
}

module.exports = Good;

//创建新物品
Good.prototype.create = function(callback){
	ctime = new Date();
	ctime = Math.ceil(ctime.getTime()/1000);
	data = {
		'uid' : this.uid,
		'gname' : this.gname,
		'gdesc' : this.gdesc,//描述
		'gprice' : this.gprice,
		'mobile' : this.mobile,
		'status' : this.status,//状态 未售出 已售出等
		'place' : this.place,
		'browser_num' : this.browser_num,//浏览数
		'classify' : this.classify
	}
	db.insert_one(data,table_name,function(data){
		return callback(data);
	});
}

//更新
Good.update = function(id,data){
	return db.update_by_id(data,id,table_name)
}

//根据uid获取信息
Good.get_all_by_uid = function(uid,begin,length){
	return db.query("SELECT * FROM "+table_name+" WHERE uid="+uid+" LIMIT "+begin+","+length);
}

//根据id获取信息
Good.get_one = function(id){
	return db.select_one(id,table_name)
}

//获取数据段 做首页及分页使用
Good.get_by_count = function(begin,length){
	return db.select_with_count(begin,length,table_name);
}

//总数
Good.get_count = function(){
	return db.get_count(table_name);
}

//删除
Good.remove = function(id){
	return db.delete_by_id(id,table_name);
}
