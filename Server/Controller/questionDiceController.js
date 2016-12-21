var questionDiceDao =require('../DBSql/questionDiceDao');

exports.ConfirmOrder= function(condition,_callback){
	
	questionDiceDao.addQuestionDice(condition,_callback);
};


exports.FindQuestionDice=function(condition,_callback){
	questionDiceDao.FindQuestionDice(condition,_callback);
};


