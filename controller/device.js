var fs = require('fs');
var path = require('path');
var async = require('async');
var config = require('../config.js').config;
var userDao = require('../doc/user.js');
var Util = require('../lib/util.js');
/*
 * GET home page.
 */

exports.show = function(req, res,next){
    userDao.queryAllUsers(function(err,user){//得到所有的用户
        res.render('index', {users : user});
    })
};

exports.add = function(req, res,next){
    var Device_name = req.body.Device_name;
    var state = req.body.state;
   userDao.save_DREGISTER(Device_name,state,function(err, user){  })

};
exports.del = function(req, res,next){
    var deleteuid = req.body.deleteuid;
    console.log(deleteuid);
    userDao.delete_DREGISTER(deleteuid,function(err, user){  })

};
exports.upd = function(req, res,next){
    var updateuid = req.body.updateuid;
    var use_name=req.body.use_name;
    var state2=req.body.state;
    var state;
    if(state2.indexOf("使用中")!=-1)
    state=1;
    else
    state=0;
    var datatime=req.body.datatime;
    userDao.update_DREGISTER(use_name,state,datatime,updateuid,function(err, user){  })

};