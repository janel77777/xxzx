var request = require('request');
var util = require('./util');
var config = require('../config/config');
var aotuConfig = config.wx_config.aotu;
var userutil = {
  GetOpenId: GetOpenId,
  GetUserInfo:GetUserInfo,
  GetAccess_token:GetAccess_token
};

function GetAccess_token(){
	return new Promise(function(resolve,reject){
		util.getToken(aotuConfig,function(result){
			if(result.err){
				reject("the function(GetAccess_token) get Token error ") ;
			}
			else{
				resolve(result.data.access_token);
			}
		});
	});	
};

function GetOpenId(code){
  return new Promise(function(resolve,reject){
   var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+
   aotuConfig.appid+'&secret='+aotuConfig.secret+'&code='+
   code+'&grant_type=authorization_code';
   request.get(url,function(err,httpResponse,body){
     if (err) {
      reject("Get token Code happened error");
    }
    else
    {
     var data = JSON.parse(body);
     resolve(data.openid);
   }
 });
 });
};

//获取用户信息
function GetUserInfo(access_token,openid){
	return new Promise(function(resolve,reject){
		var url = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token='+access_token+'&openid='+openid+'&lang=zh_CN';
		request.get(url,function(err,httpResponse,body){
			if(err) return reject(err);
			resolve(JSON.parse(body));
		});
	});
};

module.exports = userutil;