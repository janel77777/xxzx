var router = require('express').Router();
var config = require('../config/config');
var aotuConfig = config.wx_config.aotu;
var request = require('request');
var util = require('../util/util');
var userutil = require('../util/userutil');
var questionDiceCtrl = require('../Server/Controller/questionDiceController');


router.get('/', function(req, res, next) {
	var array=[];
	FindQuestionDice().then(function(data){
		array.push(data);
		return userutil.GetAccess_token();
	}).then(function(_data){
		array.push(_data);
		return	GetAllIcon(array);
	}).then(function(data){
		res.render('questionlist',{questionlists:data
		});
	},function(error){
		console.log(error);
		res.send(error);
		  res.end();
	});

});

router.get('/questiondetail', function(req, res, next) {
	
	res.render('questiondetail',{
	});
});

var GetAllIcon = function(data){
	return new Promise(function(resolve,reject){
		var	questionlist=data[0];
		var access_token=data[1];
		var allprimise=[];
		for(question of questionlist){
			allprimise.push( userutil.GetUserInfo(access_token,question.questionUserID));
		}

		Promise.all(allprimise).then(function(results){
			for(question of questionlist){
				for(userinfo of results){
					if(userinfo.openid==question.questionUserID){
						question.userinfo=userinfo;
						break;
					}
				}
				resolve(questionlist);
			}
		},function(errs){
			reject(errs);
		});
	});
};





var FindQuestionDice=function(){
	return new Promise(function(resolve,reject){
		questionDiceCtrl.FindQuestionDice({},function(data){
			if(data.success!=1){
				console.log("Get Question Dice data error");
				reject("find question order list failed");
			}
			else{
				resolve(data.result);
			}
		});

	});
};


module.exports = router;