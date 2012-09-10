/**
 * passport async
 */
var async = require('async');
var config = require('../config.js').config;
var contacts = require('../dao/contacts.js');
var Util = require('../lib/util.js');
exports.index = function(req, res){
    res.render('./contacts/SendMessage')
};
exports.message = function(req, res){
    res.render('./contacts/MessageRecords')
};
exports.list = function(req, res){
    res.render('./contacts/ContactsList.ejs')
};
exports.test = function(req, res,next){
    res.render('./contacts/contacts.ejs')
};
exports.addSnsGroupGet = function(req,res,next){   
        console.log(req.query.id);
        console.log(req.query.UserName);
        console.log(req.query.uid);
        // console.log(req.headers);
        var user_id = req.query.uid;
        var id = req.query.id;
        var name = req.query.UserName;
    contacts.addSnsGroup(user_id,id,name,function(err, info) {
        if (err) {
            console.log('ClientConnectionReady Error: ' + err.message);  
            res.end();
            console.log('Error end');  
            return;  
        }
        else {
            res.json(JSON.parse('{"flag":"true","info":info}'));
            return;
        }
    }); 
};
exports.addSnsGroup = function(req,res,next){   
        console.log(req.query.id);
        console.log(req.query.UserName);
        console.log(req.query.uid);
        console.log(req.headers);
    // var temp ="";
    // for (var i in req) {
    //     temp += i+"</br>";
    // };
    // contacts.addSnsGroup(user_id,id,name,function(err, info) {
    //     if (err) {
    //         res.json(JSON.parse('{"flag":"false"}'));
    //         return;
    //     }
    //     else {
    //         res.json(JSON.parse('{"flag":"true","info":info}'));
    //         return;
    //     }
    // });
    res.end(); 
};
exports.deleGroup = function(req,res,next){
    if (!req.session.user) {
        res.json(JSON.parse('{"flag":"false","info":"未登录用户"}'));
        return;
    }
    contacts.deleGroup(req.session.user.id, id,name,contact_id, function(err, info) {
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
exports.updateGroup = function(req,res,next){
     if (!req.session.user) {
        res.json(JSON.parse('{"flag":"false","info":"未登录用户"}'));
        return;
    }
    contacts.updateGroup(req.session.user.id, id,name,contact_id, function(err, info) {
        if (err) {
            res.json(JSON.parse('{"flag":"false"}'));
            return;
        }
        else {
            res.json(JSON.parse('{"flag":"true"}'));
            return;
        }
    });
};
exports.pageLoad = function(req,res,next){
     if (!req.session.user) {
        res.json(JSON.parse('{"flag":"false","info":"未登录用户"}'));
        return;
    }
    contacts.addGroup(req.session.user.id, id,name,contact_id, function(err, info) {
        if (err) {
            res.json(JSON.parse('{"flag":"false"}'));
            return;
        }
        else {
            res.json(JSON.parse('{"flag":"true"}'));
            return;
        }
    });
};  
exports.getListByGroup = function(req,res,next){
     contacts.getListByGroup(req.session.user.id, id,name,contact_id, function(err, info) {
        if (err) {
            res.json(JSON.parse('{"flag":"false"}'));
            return;
        }
        else {
            res.json(JSON.parse('{"flag":"true"}'));
            return;
        }
    });
};
exports.addUser = function(req,res,next){
    if (!req.session.user) {
        res.json(JSON.parse('{"flag":"false","info":"未登录用户"}'));
        return;
    }
    contacts.addUser(req.session.user.id, id,name,contact_id, function(err, info) {
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
exports.updateUser = function(req,res,next){
    if (!req.session.user) {
        res.json(JSON.parse('{"flag":"false","info":"未登录用户"}'));
        return;
    }
    contacts.updateUser(req.session.user.id, id,name,contact_id, function(err, info) {
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
exports.deleteUser = function(req,res,next){
    if (!req.session.user) {
        res.json(JSON.parse('{"flag":"false","info":"未登录用户"}'));
        return;
    }
    contacts.deleteUser(req.session.user.id, id,name,contact_id, function(err, info) {
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
exports.loadAllUser = function(req,res,next){
    var data = {"person":[
        {'name':'的反对反对法','age':'20','department':'教育司','address':'北京城建大厦','tele':'27273834348'},
        {'name':'对象','age':'22','department':'jksdjksd','address':'北京城建大厦','tele':'27273834348'},
         {'name':'简称','age':'20','department':'教育司','address':'北京城建大厦','tele':'27273834348'},
        {'name':'服务','age':'22','department':'jksdjksd','address':'北京城建大厦','tele':'27273834348'},
         {'name':'格式','age':'20','department':'教育司','address':'北京城建大厦','tele':'27273834348'},
        {'name':'后台','age':'22','department':'jksdjksd','address':'北京城建大厦','tele':'27273834348'},
         {'name':'载','age':'20','department':'教育司','address':'北京城建大厦','tele':'27273834348'},
        {'name':'leech','age':'28','department':'jk3dddfsdjksd','address':'北京城建大厦','tele':'27273834348'}
    ]};
    res.json(data);
};
exports.getUserListByPageIndex = function(req,res,next){
    res.render('./contacts/contacts');
};
exports.edit_info = function(req, res) {
    var data = {"person":[
        {'name':'的反对反对法','age':'20','department':'教育司','address':'北京城建大厦','tele':'27273834348'},
        {'name':'对象','age':'22','department':'jksdjksd','address':'北京城建大厦','tele':'27273834348'},
         {'name':'简称','age':'20','department':'教育司','address':'北京城建大厦','tele':'27273834348'},
        {'name':'服务','age':'22','department':'jksdjksd','address':'北京城建大厦','tele':'27273834348'},
         {'name':'格式','age':'20','department':'教育司','address':'北京城建大厦','tele':'27273834348'},
        {'name':'后台','age':'22','department':'jksdjksd','address':'北京城建大厦','tele':'27273834348'},
         {'name':'载','age':'20','department':'教育司','address':'北京城建大厦','tele':'27273834348'},
        {'name':'leech','age':'28','department':'jk3dddfsdjksd','address':'北京城建大厦','tele':'27273834348'}
    ]};
    // res.json(data);
    console.log("dfdfdf");
    res.render('./contacts/contacts',{name:'data.name'});
};
exports.queryAllSnsUsers = function(req, res) {
    contacts.queryAllSnsUsers(function(err, users) {
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