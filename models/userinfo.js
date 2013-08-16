var db = require('./db');
var data = {},ctime;

function Userinfo(userinfo){
	this.table_name = "cpc_userinfo";
	this.uavatar = userinfo.uavatar;
	this.gender = userinfo.gender;
	this.schoolid = userinfo.schoolid;//
}

module.exports = Userinfo;

//创建新用户
Userinfo.create = function(){
	ctime = new Date();
	ctime = Math.ceil(ctime.getTime()/1000);
	data = {
		'uavatar' = this.uid,
		'gender' = this.gname,
		'schoolid' = this.gdesc,
		'ctime' = ctime
	}
	db.insert_one(data,this.table_name);
}

//更新
Userinfo.update = function(id,data){
	return db.update_by_id(data,id,this.table_name)
}

//根据id获取信息
Userinfo.get_one = function(id){
	return db.query("SELECT * FROM "+this.table_name+" WHERE id="+id);
}

//删除
Userinfo.remove = function(id){
	return db.delete_by_id(id,this.table_name);
}
