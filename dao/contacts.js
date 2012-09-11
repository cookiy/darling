var async = require('async');
var mysql = require('../lib/mysql.js');
var Util = require('../lib/util.js');


//////////////////  短信组  ////////////////////
/**
 * 获得一个最新ID  (用于sns_group id添加) 
 */
exports.getMaxId = function(callback) {
    mysql.update("insert into SEQUENCE values() ",  function(err, info) {
        callback(err, info);
    });
    mysql.queeryOne("select max(id) from SEQUENCE where status = '0'",  function(err, id) {
        callback(err, id);
    });
};
/**
 * 添加组
 */
exports.addSnsGroup = function(user_id,id,name,callback){
    mysql.update('insert into sns_group(user_id,id,name) values(?,?,?)', [ user_id,id,name ], function(err, info) {
        callback(err, info);
    });
};
/**
 * 编辑组
 */
exports.editSnsGroup = function(id,name,callback){
    mysql.update('update sns_group set name=? where id = ? ', [ id ], function(err, info) {
        callback(err, info);
    });
};
/**
 * 删除组
 * nic  分组下的用户分组信息将同时删除
 */
exports.delSnsGroup = function(id , callback){
    mysql.update ('delete sns_group where id = ?',[ id ], function(err, info) {
        callback(err, info);
    });
};
////////////////////////  短信联系人  ////////////////////////
/**
 * 查询所有组信息
 */
exports.queryAllSnsGroups = function(callback){
    mysql.query('select * from sns_group', function(err, groups) {
        callback(err, groups);
    });
};
/**
 * 获取所有短信联系人
 */
exports.queryAllSnsUsers = function(callback){
    mysql.query('select * from SNS_CONTACT', function(err, users) {
        callback(err, users);
    });
};
/**
 * 根据组ID 获取短信联系人
 */
exports.queryAllSnsUsers = function(id, callback){
    mysql.query('select c.* from sns_group g join sns_contact c on g.contact_id = c.id where group_id = ?', [ id ], function(err, users) {
        callback(err, users);
    });
};

/**
 * 添加短信联系人
 */
exports.addSnsGroup = function(name,mobile_phone_no, conpany ,department, callback){
    mysql.update('insert into sns_contact(name，mobile_phone_no, conpany ,department) values(?,?,?,?)', [ name,mobile_phone_no, conpany ,department ], function(err, info) {
        callback(err, info);
    });
};
/**
 * 删除短信联系人
 */
exports.addSnsGroup = function(id, callback){
    mysql.update('delete sns_contact where id = ?', [ id ], function(err, info) {
        callback(err, info);
    });
};
/**
 * 更新短信联系人信息
 */
exports.addSnsGroup = function(name,mobile_phone_no, conpany ,department, callback){
    mysql.update('update sns_contact set name = ? ,mobile_phone_no = ? , conpany = ? ,department = ?', [ name,mobile_phone_no, conpany ,department ], function(err, info) {
        callback(err, info);
    });
};
/**
 * 短信联系人信息换组
 */
exports.addSnsGroup = function(newid , oldid , userid , callback){
    mysql.update('update sns_group set group_id = ? where group_id = ? and contact_id = ?', [ newid , oldid , userid  ], function(err, info) {
        callback(err, info);
    });
};







//////  下面这一堆 没用吧？ //////////


/**
 * 页面显示通讯录  
 */
exports.queryUser = function(userId, callback) {
    mysql.queryOne("select * from passport where id = ? and IS_DELETED = '0'", [ userId ], function(err, user) {
        callback(err, user);
    });
};
/**
 * 获取通讯录所有组已经组员人数
 * nic 当前用户
 */
exports.queryAllUsers = function(userId, callback){
    mysql.query('select id,count(*) from user_group where user_id = ? group by id', [ userId ], function(err, user) {
        callback(err, users);
    });
};
/**
 * 页面显示当前用户的通讯录  没用？
 */
exports.queryUsers = function(userId, callback){
    // nic  mysql.query('select * from user where id in ('+userIds.join(',')+')',function(err, users){
	mysql.query('select * from user_group where user_id = ?', [ userId ], function(err, user) {
        callback(err, users);
    });
};
/**
 * 根据用户姓名获取用户信息
 */
exports.queryAllUsers = function(name,callback){
    mysql.query("select * from user where name like '%?%'",[ name ], function(err, users){
        callback(err, users);
    });
};




