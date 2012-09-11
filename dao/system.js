var async = require('async');
var mysql = require('../lib/mysql.js');
var Util = require('../lib/util.js');





/////////////////////  用户相关  ///////////////////////////
/**
 * 获取通讯录所有用户信息
 */
exports.queryAllUsers = function(callback){
     mysql.query('select * from user',function(err, users){
        callback(err, users);
    });
};
/**
 * 部门下所有用户
 */
exports.queryUsersByDept = function(dept_id , callback){
     mysql.query('select * from user where DEPARTMENT_ID = ?',[dept_id],function(err, users){
        callback(err, users);
    });
};
/**
 * 添加用户
 */
exports.addUser = function(ID ,NAME ,DEPARTMENT_ID ,POST ,ROOM_NUMBER ,MOBILE_PHONE_NO , HOME_PHONE ,WORK_PHONE ,QQ_NO ,EMAIL ,ADDRESS ,LOGIN_NAME ,PASSWORD ,STATUS,UPDATER , callback){
    mysql.update('insert into user( NAME ,DEPARTMENT_ID ,POST ,ROOM_NUMBER ,MOBILE_PHONE_NO , HOME_PHONE ,WORK_PHONE ,QQ_NO ,EMAIL ,ADDRESS ,LOGIN_NAME ,PASSWORD ,STATUS,UPDATER) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [ ID ,NAME ,DEPARTMENT_ID ,POST ,ROOM_NUMBER ,MOBILE_PHONE_NO , HOME_PHONE ,WORK_PHONE ,QQ_NO ,EMAIL ,ADDRESS ,LOGIN_NAME ,PASSWORD ,STATUS,UPDATER ], function(err, info) {
        callback(err, info);
    });
};
/**
 * 更新编辑保存用户
 */
exports.updateUser = function(ID ,NAME ,DEPARTMENT_ID ,POST ,ROOM_NUMBER ,MOBILE_PHONE_NO , HOME_PHONE ,WORK_PHONE ,QQ_NO ,EMAIL ,ADDRESS ,LOGIN_NAME ,PASSWORD ,STATUS,UPDATER ,callback){
    mysql.update('update user set ID  = ?,NAME  = ?,DEPARTMENT_ID  = ?,POST  = ?,ROOM_NUMBER  = ?,MOBILE_PHONE_NO  = ?, HOME_PHONE  = ?,WORK_PHONE  = ?,QQ_NO  = ?,EMAIL  = ?,ADDRESS  = ?,LOGIN_NAME  = ?,PASSWORD  = ?,STATUS = ?,UPDATER = ? ', [ ID ,NAME ,DEPARTMENT_ID ,POST ,ROOM_NUMBER ,MOBILE_PHONE_NO , HOME_PHONE ,WORK_PHONE ,QQ_NO ,EMAIL ,ADDRESS ,LOGIN_NAME ,PASSWORD ,STATUS,UPDATER ], function(err, info) {
        callback(err, info);
    });
};
/**
 * 删除用户 user逻辑删除
 */
exports.deleteUser = function(id,callback){
    mysql.update("update user set IS_DELETED = '1' where id = ?",[ id ], function(err, info) {
        callback(err, info);
    });
};

/////////////////  部门相关  ///////////////////
/**
 * 查询全部部门 ID 名字
 */
exports.queryAllDepts = function(callback){
     mysql.query('select ID,DETARTMENT_NAME from STRUCTURE',function(err, depts){
        callback(err, depts);
    });
};
/**
 * 添加部门
 */
exports.addDepts = function(DETARTMENT_NAME , userId , callback){
     mysql.update('insert into STRUCTURE values (DETARTMENT_NAME,UPDATER)',[DETARTMENT_NAME , userId],function(err, info){
        callback(err, info);
    });
};
/**
 * 更新部门
 */
exports.addDepts = function(DETARTMENT_NAME , userId , callback){
     mysql.update('update STRUCTURE set DETARTMENT_NAME=? ,UPDATER=?',[DETARTMENT_NAME , userId],function(err, info){
        callback(err, info);
    });
};
/**
 * 删除部门
 */
exports.addDepts = function(id , callback){
     mysql.update('delete STRUCTURE where id=?',[id],function(err, info){
        callback(err, info);
    });
     mysql.update('update user set DEPARTMENT_ID is null where DEPARTMENT_ID = ?',[id],function(err, info){
        callback(err, info);
    });
};