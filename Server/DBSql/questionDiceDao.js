var questionDice =require('../models/questionDice');
var dbHelper = require('../DBhelper/dbHelper');

exports.addQuestionDice = function(conditions,callback) {
	var aquestionDicModel =questionDice.getModel();
	dbHelper.addData(aquestionDicModel,conditions,function(result) {
		callback(result);
	});
};

exports.FindQuestionDice=function(conditions,callback){
	var aquestionDicModel =questionDice.getModel();
	dbHelper.findData(aquestionDicModel,conditions,null,null,callback);
}

