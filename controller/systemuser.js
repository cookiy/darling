/**
 * system async
 */
var async = require('async');
var config = require('../config.js').config;
var sys = require('../dao/system.js');
var Util = require('../lib/util.js');
exports.userlist = function(req, res){
    res.render('./systemusers/userlist');
};

exports.edituser = function(req, res){
    res.render('./systemusers/useredit');
};
exports.GetAllSysUser = function(req, res){
    sys.queryAllUsers(function(err, users) {
        if (err) {
            console.log(err.message);
            res.json(JSON.parse('{"flag":"false"}'));
            return;
        }
        else {
            res.json(JSON.parse('{"flag":"true"}'));
            return;
        }
    });
};
exports.GetDepartment = function(req, res){
    sys.queryAllDepts(function(err, depts) {
        if (err) {
            res.json(JSON.parse('{"flag":"false"}'));
            return;
        }
        else {
            res.json(JSON.parse(depts));
            return;
        }
    });
};
exports.GetSysUserByDepartmentID = function(req, res){
    sys.queryUsersByDept(dept_id,function(err, users) {
        if (err) {
            res.json(JSON.parse('{"flag":"false"}'));
            return;
        }
        else {
            res.json(JSON.parse(users));
            return;
        }
    });
};
exports.AddSysUser = function(req, res){
    sys.addUser(ID ,NAME ,DEPARTMENT_ID ,POST ,ROOM_NUMBER ,MOBILE_PHONE_NO , HOME_PHONE ,WORK_PHONE ,QQ_NO ,EMAIL ,ADDRESS ,LOGIN_NAME ,PASSWORD ,STATUS,UPDATER , function(err, info) {
        if (err) {
            res.json(JSON.parse('{"flag":"false","info":"服务器出错了"}'));
            return;
        }
        else {
            res.json(JSON.parse('{"flag":"true"}'));
            return;
        }
    });
};
exports.SaveSysUser = function(req, res){
    sys.updateUser(ID ,NAME ,DEPARTMENT_ID ,POST ,ROOM_NUMBER ,MOBILE_PHONE_NO , HOME_PHONE ,WORK_PHONE ,QQ_NO ,EMAIL ,ADDRESS ,LOGIN_NAME ,PASSWORD ,STATUS,UPDATER_ID ,NAME ,DEPARTMENT_ID ,POST ,ROOM_NUMBER ,MOBILE_PHONE_NO , HOME_PHONE ,WORK_PHONE ,QQ_NO ,EMAIL ,ADDRESS ,LOGIN_NAME ,PASSWORD ,STATUS,UPDATER , function(err, info) {
        if (err) {
            res.json(JSON.parse('{"flag":"false","info":"服务器出错了"}'));
            return;
        }
        else {
            res.json(JSON.parse('{"flag":"true"}'));
            return;
        }
    });
  };
exports.DeleteSysUser = function(req, res){
   sys.addUser(ID, function(err, info) {
        if (err) {
            res.json(JSON.parse('{"flag":"false","info":"服务器出错了"}'));
            return;
        }
        else {
           res.json(JSON.parse('{"flag":"true"}'));
            return;
        }
    });
};
