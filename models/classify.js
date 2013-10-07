var db = require('./db');
var data = {},ctime;
var table_name = "cpc_classify";

function Classify(classify){

}

module.exports = Classify;

Classify.getAllClassify = function(callback){
	db.select_all(table_name,function(cData){
		return callback(cData);
	})
};

