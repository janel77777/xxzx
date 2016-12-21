var mongoose = require('mongoose');
var Schema   = mongoose.Schema;



var questionDiceSchema=new mongoose.Schema({
	questionUserID:{type:String},
	reward:{type:Number},
	orderID :{type:String},
	orderStatus :{type:String},//pay,pending_back,back_reject,back.
	questionStatus:{type:String},//initialize,answered,end.
	question:{type:String},
	selectedAstrolabe:{type:String},
	selectedConstellation:{type:String},
	selectedPalace:{type:String},
	requirement:{type:String},
	QuestionTime:{type:Date,default:Date.now}
});



module.exports = {
	getModel: function(){
		return _getModel();
	}
};


var _getModel = function(type,err){
	var questionDiceModel = global.db.model('col_questionDice',questionDiceSchema);
	return questionDiceModel;
};
