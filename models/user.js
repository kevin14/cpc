var db = require('./db');
var data = {},ctime,table_name = "cpc_user";

function User(user){
	this.username = user.username;
	this.email = user.email;
	this.password = user.password;
	this.ip = user.ip;
}

module.exports = User;

//创建新用户
User.prototype.create = function(callback){
	ctime = new Date();
	ctime = Math.ceil(ctime.getTime()/1000);
	data = {
		'username':this.username,
		'email':this.email,
		'password':this.password,
		'ip':this.ip,
		'ctime':ctime
	}
	db.insert_one(data,table_name,function(data){
		return callback(data);
	});
}


//更新用户信息
User.update = function(id,data){
	db.update_by_id(data,id,this.table_name)
}

//根据id获取用户信息
User.get_one = function(id){
	db.select_one(id,this.table_name)
}

//用户登陆 验证邮箱
User.user_login = function(email,callback){
	db.select_by_title("email",email,table_name,function(data){
		return callback(data);
	})
}

//删除用户
User.remove = function(id){
	db.delete_by_id(id,this.table_name);
}

//check email ajax
User.checkEmail = function(email){
	db.query("SELCET 'id' FROM "+this.table_name+" WHERE 'email' = "+email)
	if (true) {};//TODO 判断
}

//check username ajax 用户注册
User.checkUsername = function(username){

}