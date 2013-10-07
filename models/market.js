var db = require('./db');
var data = {},ctime,table_name = "cpc_goods",conn;

function Good(good){
	this.table_name = "cpc_goods";
	this.uid = good.uid;
	this.gname = good.gname;
	this.gdesc = good.gdesc;//
	this.gprice = good.gprice;
	this.mobile = good.mobile;
	//this.status = good.status;状态 未售出 已售出等
	this.place = good.place;
	this.browser_num = good.browser_num;
	this.status = good.status;
	this.gpic_url = good.gpic_url;
	// this.browser_num = good.browser_num;浏览数
	this.classify = good.classify;
	this.gpic_url_small = good.gpic_url_small;
}

module.exports = Good;

//创建新物品
Good.prototype.create = function(callback){
	conn = db.mysql.createConnection(db.dbConnInfo);
	ctime = new Date();
	ctime = Math.ceil(ctime.getTime()/1000);
	data = {
		'uid' : this.uid,
		'gname' : this.gname,
		'gdesc' : this.gdesc,//描述
		'gprice' : this.gprice,
		'mobile' : this.mobile,
		'status' : this.status,
		'place' : this.place,
		'browser_num' : this.browser_num,//浏览数
		'classify' : this.classify,
		'gpic_url':this.gpic_url,
		'ctime':ctime,
		'gpic_url_small':this.gpic_url_small
	};
	var classify_id = data.classify;
	db.insert_one(data,table_name,function(data){
		conn.query("UPDATE cpc_classify SET g_nums = g_nums+1 WHERE id = "+classify_id,function(err,rs,field){
			if (err) {console.log(err)};
			return callback(data);
		});
	});
}

//更新
Good.update = function(id,data){
	return db.update_by_id(data,id,table_name);
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
Good.get_good_list = function(begin,length,callback){
	conn = db.mysql.createConnection(db.dbConnInfo);
	conn.query("SELECT id,gname,gpic_url_small,browser_num,place,classify,ctime FROM "+table_name+" WHERE status = 0 ORDER BY id DESC LIMIT "+begin+","+length,function(err,rs,field){
		conn.query("SELECT count(0) FROM "+table_name,function(count_err,count,count_field){
			conn.end();
			if (err||count_err) {
				console.log(err&&count_err);
				return false;
			};
			return callback({
				data:rs,
				count:count
			});
		})	
	});
}

//这里有待提高 我做的有点2
Good.getByClassName = function(cid,begin,length,callback){
	conn = db.mysql.createConnection(db.dbConnInfo);
	conn.query("SELECT id,gname,gpic_url_small,browser_num,place,classify,ctime FROM "+table_name+" WHERE status = 0 AND classify = "+cid+" ORDER BY id DESC LIMIT "+begin+","+length,function(err,rs,field){
		conn.query("SELECT count(0) FROM "+table_name,function(count_err,count,count_field){
			conn.end();
			if (err||count_err) {
				console.log(err&&count_err);
				return false;
			};
			return callback({
				data:rs,
				count:count
			});
		})	
	});
}

//分页的时候调用 可以把分类还有学校的id带进去
Good.getBySchool = function(schoolId,classify_id,begin,length,callback){
	conn = db.mysql.createConnection(db.dbConnInfo);
	var cmd = "SELECT id,gname,gpic_url_small,browser_num,place,classify,ctime FROM "+table_name+" WHERE status = 0";
	if (schoolId!=0) {
		cmd+=" AND place = "+schoolId;
	};
	if (classify_id!=0) {
		cmd+=" AND classify = "+classify_id;
	};
	cmd+=" ORDER BY id DESC LIMIT "+begin+","+length;
	conn.query(cmd,function(err,rs,field){
		conn.end();
		if (err) {
			console.log(err);
			return false;
		};
		return callback(rs);
	});
}

//获得分类＋学校的总数
Good.getCountByClass = function(classify_id,schoolId,callback){
	conn = db.mysql.createConnection(db.dbConnInfo);
	var cmd = "SELECT count(0) FROM "+table_name+" WHERE status = 0";
	if (schoolId!=0) {
		cmd+=" AND place = "+schoolId;
	};
	if (classify_id!=0) {
		cmd+=" AND classify = "+classify_id;
	};
	conn.query(cmd,function(err,rs,field){
		conn.end();
		if (err) {
			console.log(err);
			return false;
		};
		return callback(rs[0]["count(0)"])
	})
}

//删除
Good.remove = function(id){
	return db.delete_by_id(id,table_name);
}
