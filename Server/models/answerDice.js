var mongoose = require('mongoose');
var Schema   = mongoose.Schema;



var answerDiceSchema=new mongoose.Schema({
	answerUserID:{type.String},
	questionID:{type: Schema.Types.ObjectId, ref: 'col_questionDice' },
	responseConent:{type:String},
	responseTime:{type.Date，default:Date.now}
});



module.exports = {
	getModel: function(){
		return _getModel();
	}
};

var _getModel = function(type,err){
	var answerDiceSchemaDiceModel = global.db.model('col_answerDice',answerDiceSchema);
	return answerDiceSchemaDiceModel;
};
