var astrolabeDao =require('../DBSql/astrolabeDao');
var fs = require('fs');

exports.InitAstrolabeAction = function() {

	removeAlldata();
	addAllData();

};

var removeAlldata=function(){
	astrolabeDao.removeAstrolabe(null,function(result){
		
	});
};

var addAllData=function(){
	fs.readFile(process.cwd() + '/public/json/' + 'astrolabe.json', 'utf8',function(err,data){
		for(item of JSON.parse(data)){
			item.fileType="astrolabe";
			astrolabeDao.addAstrolabe(item,function(result){
           // res.json(result);
       });
		}
	});

	fs.readFile(process.cwd() + '/public/json/' + 'constellation.json', 'utf8',function(err,data){
		for(item of JSON.parse(data)){
			item.fileType="constellation";
			astrolabeDao.addAstrolabe(item,function(result){
           // res.json(result);
       });
		}
	});

	fs.readFile(process.cwd() + '/public/json/' + 'romanCharacter.json', 'utf8',function(err,data){
		for(item of JSON.parse(data)){
			item.fileType="palace";
			astrolabeDao.addAstrolabe(item,function(result){
           // res.json(result);
       });
		}
	});	
}