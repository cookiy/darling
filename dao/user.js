var async = require('async');
var mysql = require('../lib/mysql.js');
var Util = require('../lib/util.js');
/**
 * 通过ID获取某一用户
 */
exports.queryUser = function(userId, callback) {
    mysql.queryOne("select * from user where id = ?", [ userId ], function(err, user) {
        callback(err, user);
    });
};
/**
 * 通过ids批量查询用户
 */
exports.queryUsers = function(userIds, callback){
    mysql.query('select * from user where id in ('+userIds.join(',')+')',function(err, users){
        callback(err, users);
    });
};
/**
 * 查询所有用户
 */
exports.queryAllUsers = function(callback){
    mysql.query('select * from user',function(err, users){
        callback(err, users);
    });
};

/**
 * 通过用户名获取某一用户
 */
exports.queryUserByLoginName = function(loginname, callback) {
    mysql.queryOne('select * from user where loginname=?', [ loginname ], function(err, user) {
        callback(err, user);
    });

};

/**
 * 新建用户
 */
exports.saveUser = function(loginname, email, pass, createAt, avatarUrl, callback){
    mysql.update('insert into user(loginname,email,pwd,create_at,avatar) values(?,?,?,?,?)', [ loginname, email, pass, createAt, avatarUrl ], function(err, info) {
        callback(err, info);
    });
};

/**
 * 更新密码
 */
exports.updatePwd = function(userId, pwd, callback){
    mysql.update('update user set pwd = ? where id = ?', [ common.md5(pwd), userId ], function(err,info){
        callback(err, info);
    });
};

/**
 * 更新头像
 */
exports.updateAvatar = function(userId, avatar, callback){
    mysql.updateAvatar('update user set avatar = ? where id = ?', [avatar, userId], function(err, info){
        callback(err, info);
    });
};

