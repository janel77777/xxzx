module.exports = {
  wx_config: {
    aotu: {
      token: 'jojjxlG1HeVnEnHd6jhHZ8EqOq9m1ry9syAbqS14EGX9ef1wA4HpIKulTkVHCn8cGIc6CKG4rlnBNj3sfcjk1jEn_dMSYUWqP6UZuTcRLt-XVquI0i3C-_dXlhUmnuaOOYUgABAFPL',
      appid: 'wxb3502367cf9b3b57',
      secret: '95f4afa1113f5cc7ab22dae197299ee9',
      cached: {},
      menu: {
        "button": [{
          "name": "游戏",
          "sub_button": [{
            "type": "view",
            "name": "占星骰子",
            "url": "http://xiaowan.viphk.ngrok.org/cece"
          }
          ]
        }, {
          "name": "生活工具",
          "sub_button": [{
            "type": "click",
            "name": "天气",
            "key": "getlocationweather",
            "sub_button": []
          }, {
            "type": "location_select",
            "name": "发送位置",
            "key": "location_select",
            "sub_button": []
          }, {
            "type": "click",
            "name": "我的信息",
            "key": "my_info",
            "sub_button": []
          }]
        }, {
          "name": "开发小工具",
          "sub_button": [{
            "type": "scancode_push",
            "name": "扫码推事件",
            "key": "scancode_push",
          }, {
            "type": "scancode_waitmsg",
            "name": "扫码带提示",
            "key": "scancode_waitmsg"
          }, {
            "type": "pic_sysphoto",
            "name": "系统拍照发图",
            "key": "pic_sysphoto",
            "sub_button": []
          }, {
            "type": "pic_photo_or_album",
            "name": "拍照或者相册发图",
            "key": "pic_photo_or_album",
            "sub_button": []
          }, {
            "type": "pic_weixin",
            "name": "微信相册发图",
            "key": "pic_weixin",
            "sub_button": []
          }]
        }]
      },
       rolemenu :{
"button":[
          {
          "name": "游戏",
          "sub_button": [
           {
            "type": "view",
            "name": "抢答",
            "url": "http://xiaowan.viphk.ngrok.org/question"
          }]
        }],
        "matchrule":{"group_id":"100"}
      }
    },
   
    tq: {
      "ipURL": "http://whois.pconline.com.cn/ipJson.jsp?json=true",
      "ipToCityNameURL": "http://apis.baidu.com/apistore/iplookupservice/iplookup?ip=",
      "ipToCityNameApiKey": "7328474baf90532437b4becdc5f65706",
      'cityUrl': 'http://apistore.baidu.com/microservice/cityinfo?cityname=',
      'weatherApikey': '7328474baf90532437b4becdc5f65706',
      'weatherUrl': 'http://apis.baidu.com/apistore/weatherservice/recentweathers?cityid='
    }
  }
};
