
var router = require('express').Router();
var Q=require('q');
var config = require('../config/config');
var aotuConfig = config.wx_config.aotu;
var request = require('request');
var questionDiceCtrl = require('../Server/Controller/questionDiceController');

  // 查询 Todo 列表
  router.get('/', function(req, res, next) {
    res.render('cece',{
    });
  });

  // 新增 Todo 项目
  router.post('/', function(req, res, next) {


  });


  router.get('/sentquestion',function(req,res){
    req.session.questionContent=req.query;
    res.end();
  });



  router.get('/checkResult',function(req,res){

  //get access_token and openid
  res.render('questioncece',{_data:req.session.questionContent});
});

  router.post('/checkResult',function(req,res){
    var money=req.body.money;
    var questionContent= req.session.questionContent;
    questionContent.money=money;
    var host = req.headers.host;
    var data= JSON.stringify(questionContent);
    var rUrl = encodeURIComponent('http://'+host+'/cece/GetCode');
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+
    aotuConfig.appid+'&redirect_uri='+rUrl+
    '&response_type=code&scope=snsapi_base&state='+money+'#wechat_redirect';

    res.send(url);
    res.end();  
});



router.get('/GetCode',function(req,res){
  
  var questionContent=req.session.questionContent;
  GetCode(questionContent,req.query.code).then(function(_data){
    ConfirmOrder(_data);
  }).then(function(a){
    res.redirect('/cece/paySuccessful');
  }).catch(function(a){
    debugger;
  });
});

var ConfirmOrderCallBack=function(data){
  if(data.success==0) console.log("confirmed order failed");
}

router.get('/paySuccessful',function(req,res){
  res.render('paySuccessful',{});
});


var GetCode=function(questionContent,code){
 var deferred = Q.defer();
 var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+
 aotuConfig.appid+'&secret='+aotuConfig.secret+'&code='+
 code+'&grant_type=authorization_code';
 request.get(url,function(err,httpResponse,body){
   if (err) {
     deferred.reject("Get token Code happened error");
   }
   else
   {
     var data = JSON.parse(body);
     var access_token = data.access_token;
     var openid = data.openid;
     deferred.resolve([questionContent,data]);
   }
 });
 return deferred.promise;
};

var ConfirmOrder=function(_data){
 questionContent= _data[0];
  data = _data[1];
 var deferred = Q.defer();
 var reward=questionContent.money;
 var question=questionContent.question;
 var astrolabe=questionContent.xp;
 var constellation=questionContent.xz;
 var palace=questionContent.gd;
 var order=
 {
  questionUserID:data.openid,
  reward:3,
  orderID :"",
    orderStatus :"pay",//pay,pending_back,back_reject,back.
    questionStatus:"initialize",
    question:question,
    selectedAstrolabe:astrolabe,
    selectedConstellation:constellation,
    selectedPalace:palace,
    requirement:""
  };
  questionDiceCtrl.ConfirmOrder(order,function(data){
    if(data.success==1)
    {
      deferred.resolve("save order successfully");
    }
    else
    {
     deferred.reject(data.success,"save order failed");
   }
 });
  return deferred.promise;
};



module.exports = router;
