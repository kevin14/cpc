var db = require('./db');
var data = {},ctime;

function Classify(classify){
	this.table_name = "cpc_classify";
	this.classname = classify.classname;
	this.g_nums = classify.schoolid;//分类下的物品数量
}

module.exports = Classify;

//创建新用户
Classify.create = function(){
	ctime = new Date();
	ctime = Math.ceil(ctime.getTime()/1000);
	data = {
		'classname' = this.classname,
		'g_nums' = this.g_nums,
		'ctime' = ctime
	}
	return db.insert_one(data,this.table_name);
}

//更新 + 1
Classify.add_count = function(){
	return db.update_by_id(data,id,this.table_name);
}

//更新 - 1
Classify.sub_count = function(){
	return db.update_by_id(data,id,this.table_name);
}

//获取分类数量
Classify.get_all_count = function(){
	return db.get_count(this.table_name);
}

//获取分类集
Classify.get_by_count = function(begin,length){
	return db.select_with_count(begin,length,this.table_name);
}

//删除
Classify.remove = function(id){
	return db.delete_by_id(id,this.table_name);
}
