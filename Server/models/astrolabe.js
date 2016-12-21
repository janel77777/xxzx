var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

 

var astrolabeSchema =new mongoose.Schema({
	key:{type:String},
	keyName:{type:String},
	descrition:{type:String},
	pic:{type:String}
});



module.exports = {
    getModel: function(){
        return _getModel();
    }
};


var _getModel = function(type,err){
	
    var astrolabeModel = global.db.model('col_astrolabe',astrolabeSchema);
    return astrolabeModel;

};
