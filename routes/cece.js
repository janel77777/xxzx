
var router = require('express').Router();
var config = require('../config/config');
var aotuConfig = config.wx_config.aotu;
var request = require('request');
var questionDiceCtrl = require('../Server/Controller/questionDiceController');
var userutil=require('../util/userutil');

  router.get('/', function(req, res, next) {
    res.render('cece',{
    });
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
    var rUrl = encodeURIComponent('http://'+host+'/cece/GetCode');
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+
    aotuConfig.appid+'&redirect_uri='+rUrl+
    '&response_type=code&scope=snsapi_base&state='+123+'#wechat_redirect';
    res.send(url);
    res.end();  
});



router.get('/GetCode',function(req,res){
  
  var questionContent=req.session.questionContent;
  var array=[];

  userutil.GetOpenId(req.query.code).then(function(openid){
   return ConfirmOrder(openid,questionContent);
  }).then(function(){
    res.redirect('/cece/paySuccessful');
  }).catch(function(error){
     res.status(200).send(error);
    console.log(error);
     res.end(); 
  });
});


router.get('/paySuccessful',function(req,res){
  res.render('paySuccessful',{});
});


var ConfirmOrder=function(openid,questionContent){

  return new Promise(function(resolve,reject){
   var reward=questionContent.money;
   var question=questionContent.question;
   var astrolabe=questionContent.xp;
   var constellation=questionContent.xz;
   var palace=questionContent.gd;
   var order=
   {
    questionUserID:openid,
    reward: questionContent.money,
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
      resolve("save order successfully");
    }
    else
    {
     reject("save cece order failed");
   }
 });
});

};



module.exports = router;
