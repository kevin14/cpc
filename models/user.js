var db = require('./db');
var data = {},ctime;

function User(user){
	this.table_name = "cpc_user";
	this.username = user.username;
	this.email = user.email;
	this.password = user.password;
	this.ip = user.ip;
}

module.exports = User;

//创建新用户
User.create = function(){
	ctime = new Data();
	ctime = Math.ceil(ctime.getTime()/1000);
	data = {
		'username':this.username,
		'email':this.email,
		'password':this.password,
		'ip':this.ip,
		'ctime':ctime
	}
	db.insert_one(data,this.table_name);
}


//更新用户信息
User.update = function(id,data){
	db.update_by_id(data,id,this.table_name)
}

//根据id获取用户信息
User.get_one = function(id){
	db.select_one(id,this.table_name)
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

//check username ajax
User.checkUsername = function(username){

}