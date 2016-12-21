var astrolabe =require('../models/astrolabe');
var dbHelper = require('../DBhelper/dbHelper');

/**
 * ????add??????????????user
 * @returns {Function}
 */
exports.addAstrolabe = function(conditions,callback) {
    var astrolabeModel =astrolabe.getModel();
    dbHelper.addData(astrolabeModel,conditions,function(result) {
        callback(result);

    });

};
/**
 * ????find??????????????user
 * @param conditions
 * @param dbHelper
 * @param callback
 */

exports.findAstrolabe = function(conditions,callback) {
    var astrolabeModel =astrolabe.getModel();
    var fields   = {};
    var options  = {};
    dbHelper.findData(astrolabeModel,conditions,fields,options,function(result){
        callback(result);
    });

};


exports.removeAstrolabe = function(conditions,callback) {
        var astrolabeModel =astrolabe.getModel();
        dbHelper.removeData(astrolabeModel,conditions,function(result){
        callback(result);
    });
};


