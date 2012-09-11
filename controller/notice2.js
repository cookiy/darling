/*
 * Room
 */
var fs = require('fs');
var path = require('path');
var async = require('async');
var config = require('../config.js').config;
var notice = require('../dao/notice.js');
var user = require('../dao/user.js');
var Util = require('../lib/util.js');
exports.publishNotice = function(req, res){
    res.render('./notice/noticeinfo');
};
exports.GetAllNotice = function(req, res){
	var _size = req.query.size;
	console.log(_size);
    notice.queryLeftDefaultBulletin(5,function(err, bulletins) {
        if (err) {
            console.log(err.message);
            res.json({
                    flag : 'false',
                    info : err
                });
            return;
        }
        else {
            console.log(bulletins);
            res.json({
                    flag : 'true',
                    info : bulletins
                });
            return;
        }
    });
};
exports.GetPreWeekNotice = function(req, res){
	var _bdate = req.query.bdate;
	var _edate = req.query.edate;
    notice.queryBetweenBulletin(bdate,edate,function(err, bulletins) {
        if (err) {
            console.log(err.message);
            res.json({
                    flag : 'false',
                    info : err
                });
            return;
        }
        else {
            console.log(bulletins);
            res.json({
                    flag : 'true',
                    info : bulletins
                });
            return;
        }
    });
};
exports.GetNextWeekNotice = function(req, res){
	var _bdate = req.query.bdate;
	var _edate = req.query.edate;
    notice.queryBetweenBulletin(bdate,edate,function(err, bulletins) {
        if (err) {
            console.log(err.message);
            res.json({
                    flag : 'false',
                    info : err
                });
            return;
        }
        else {
            console.log(bulletins);
            res.json({
                    flag : 'true',
                    info : bulletins
                });
            return;
        }
    });
};
exports.GetNoticeByDay = function(req, res){
	var _date = req.query.ndate;
	console.log(_date);
    notice.queryTodayBulletin(_date,function(err, bulletins) {
        if (err) {
            console.log(err.message);
            res.json({
                    flag : 'false',
                    info : err
                });
            return;
        }
        else {
            console.log(bulletins);
            res.json({
                    flag : 'true',
                    info : bulletins
                });
            return;
        }
    });
};
exports.GetTodayNotice = function(req, res){
    notice.todayBulletin(function(err, bulletins) {
        if (err) {
            console.log(err.message);
            res.json({
                    flag : 'false',
                    info : err
                });
            return;
        }
        else {
            console.log(bulletins);
            res.json({
                    flag : 'true',
                    info : bulletins
                });
            return;
        }
    });
};
exports.GetPrevNotice = function(req, res){
	var _date = req.query.ndate;
    notice.queryTodayBulletin(_date,function(err, bulletins) {
        if (err) {
            console.log(err.message);
            res.json({
                    flag : 'false',
                    info : err
                });
            return;
        }
        else {
            console.log(bulletins);
            res.json({
                    flag : 'true',
                    info : bulletins
                });
            return;
        }
    });
};
exports.GetNextNotice = function(req, res){
	var _date = req.query.ndate;
    notice.queryTodayBulletin(_date,function(err, bulletins) {
        if (err) {
            console.log(err.message);
            res.json({
                    flag : 'false',
                    info : err
                });
            return;
        }
        else {
            console.log(bulletins);
            res.json({
                    flag : 'true',
                    info : bulletins
                });
            return;
        }
    });
};
exports.GetRightNotice = function(req, res){
	var _size = req.query.size;
    notice.queryDefaultBulletin(_size,function(err, bulletins) {
        if (err) {
            console.log(err.message);
            res.json({
                    flag : 'false',
                    info : err
                });
            return;
        }
        else {
            console.log(bulletins);
            res.json({
                    flag : 'true',
                    info : devices
                });
            return;
        }
    });
};
exports.AddNotice = function(req, res){
	var _content = req.query.content;
    notice.addBulletin(_content,1,function(err, info) {
        if (err) {
            console.log(err.message);
            res.json({
                    flag : 'false',
                    info : err
                });
            return;
        }
        else {
            console.log(info);
            res.json({
                    flag : 'true',
                    info : info
                });
            return;
        }
    });
};
exports.SaveNotice = function(req, res){
	var _content = req.query.content;
    notice.editBulletin(content,1,function(err, info) {
        if (err) {
            console.log(err.message);
            res.json({
                    flag : 'false',
                    info : err
                });
            return;
        }
        else {
            console.log(info);
            res.json({
                    flag : 'true',
                    info : info
                });
            return;
        }
    });
};
exports.DeleteNotice = function(req, res){
	var _id = req.query.id;
    notice.deleteBulletin(_id,function(err, info) {
        if (err) {
            console.log(err.message);
            res.json({
                    flag : 'false',
                    info : err
                });
            return;
        }
        else {
            console.log(info);
            res.json({
                    flag : 'true',
                    info : info
                });
            return;
        }
    });
};
exports.GetAllPrevNotice = function(req, res){
	var _index = req.query.index;
	var _size = req.query.size;
    notice.queryPageBulletin(_index,_size,function(err, devices) {
        if (err) {
            console.log(err.message);
            res.json({
                    flag : 'false',
                    info : err
                });
            return;
        }
        else {
            console.log(devices);
            res.json({
                    flag : 'true',
                    info : devices
                });
            return;
        }
    });
};
exports.GetAllNextNotice = function(req, res){
	var _index = req.query.index;
	var _size = req.query.size;
    notice.queryPageBulletin(_index,_size,function(err, devices) {
        if (err) {
            console.log(err.message);
            res.json({
                    flag : 'false',
                    info : err
                });
            return;
        }
        else {
            console.log(devices);
            res.json({
                    flag : 'true',
                    info : devices
                });
            return;
        }
    });
};