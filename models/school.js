var db = require('./db');
var table_name = "cpc_schools",conn;

exports.getList = function(areaId,callback){
	db.select_by_title('area',areaId,table_name,function(data){
		callback(data);
	});
}

exports.getCity = function(callback){
	db.select_all('cpc_city',function(data){
		callback(data);
	});
}