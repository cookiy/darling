var async = require('async');
var mysql = require('../lib/mysql.js');
var Util = require('../lib/util.js');


///////////////////  公告  /////////////////////////
//bulletin
/**
 * 增加公告
 */
exports.addBulletin = function(content,user, callback){
    mysql.update('insert into bulletin(content,creater) values(?,?)', [ content,user ], function(err, info) {
        callback(err, info);
    });
};
/**
 * 更新公告
 */
exports.editBulletin = function(content,user,id ,callback){
    mysql.update('update bulletin set content = ?,updater =? where id = ?', [ content,user,id ], function(err, info) {
        callback(err, info);
    });
};
/** 
 * 删除公告
 */
exports.deleteBulletin = function(id,callback){
    mysql.update('delete from bulletin where id = ?', [ id ], function(err, info) {
        callback(err, info);
    });
};
/**
 * 获得目标日期公告
 */
exports.queryTodayBulletin = function( date , callback){
    mysql.query("select id,content,create_time from bulletin where date(create_time) = ?",[date], function(err, bulletins) {
        callback(err, bulletins);
    });
};
                /**
                 * 获得当天第一条公告
                 */
                exports.todayBulletin = function(  callback){
                    mysql.query("select * from bulletin where id = ( select min(id) from bulletin where date(create_time) = date(now()))", function(err, bulletins) {
                        callback(err, bulletins);
                    });
                };
                /**
                 * 获得日期区间公告的未读数量
                 */
                exports.queryBetweenBulletin = function( bdate , edate, callback){
                    mysql.query("select id,content,create_time from bulletin where date(create_time) between ? and ?",[bdate,edate],function(err, bulletins) {
                        callback(err, bulletins);
                    });
                };
/**
 * 默认显示（右侧初始化）
 */
exports.queryDefaultBulletin = function( size, callback){
    mysql.query("select id,content,create_time from bulletin order by id desc  limit 0,? ",[size], function(err, bulletins) {
        callback(err, bulletins);
    });
};
/**
 * 默认显示（左侧初始化） size 5
 */
exports.queryLeftDefaultBulletin = function( size, callback){
    mysql.query("select count(*) counts,date(create_time) dates,weekday(date(create_time)) weeks from bulletin group by date(create_time) order by id desc  limit 0,? ",[size], function(err, bulletins) {
        callback(err, bulletins);
    });
};
/**
 * 右侧分页
 */
exports.queryPageBulletin = function( index , size, callback){
    mysql.query("select id,content,create_time from bulletin order by id desc limit ?*(?-1)-1,? ",[size,index,size], function(err, bulletins) {
        callback(err, bulletins);
    });
};
/**
 * 左侧分页   size 5
 */
exports.queryLeftPageBulletin = function( index , size, callback){
    mysql.query("select count(*) counts,date(create_time) dates,weekday(date(create_time)) weeks from bulletin group by date(create_time) order by id desc limit ?*(?-1)-1,? ",[size,index,size], function(err, bulletins) {
        callback(err, bulletins);
    });
};
/**
 * 目标日期当天多条记录分页
 */
exports.queryPageDateBulletin = function( index , size ,date ,callback){
    mysql.query("select id,content,create_time from bulletin where date(create_time) = ? order by id desc limit ?*(?-1)-1,? ",[date,size,index,size], function(err, bulletins) {
        callback(err, bulletins);
    });
};
/**
 * 公告标记为已读
 */
exports.readBulletin = function(BULIBTIN_ID,USER_ID, callback){
    mysql.update("update bulletin_log set status = '1' where BULIBTIN_ID = ? and user_id = ?", [ BULIBTIN_ID,USER_ID ], function(err, info) {
        callback(err, info);
    });
};
/**
 * 未读公告
 */
exports.unreadBulletin = function( user_id, callback){
    mysql.query("select count(*) from bulletin_log where user_id = ? and status = '0' ",[size] ,function(err, bulletins) {
        callback(err, bulletins);
    });
};





