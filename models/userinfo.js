var db = require('./db');
var data = {},ctime,table_name = "cpc_userinfo";

function Userinfo(userinfo){
	this.uavatar = userinfo.uavatar;
	this.gender = userinfo.gender;
	this.schoolid = userinfo.schoolid;//
}

module.exports = Userinfo;

//创建新用户
Userinfo.prototype.create = function(callback){
	ctime = new Date();
	ctime = Math.ceil(ctime.getTime()/1000);
	data = {
		'uavatar' : this.uavatar,
		'gender' : this.gender,//1代表男性 2代表女性 3代表未知
		'schoolid' : this.schoolid,//目前测试阶段都用华东理工大学 也就是id 5
		'ctime' : ctime
	}
	db.insert_one(data,table_name,function(rs){
		callback(rs);
	});
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
