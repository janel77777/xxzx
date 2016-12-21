
var answerDice =require('../models/answerDice');
var dbHelper = require('../DBhelper/dbHelper');

exports.addAnswerDic = function(conditions,callback) {
var answerDiceModel =answerDice.getModel();
	dbHelper.addData(answerDiceModel,conditions,function(result) {
		callback(result);
	});
};

