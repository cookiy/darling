var mysql = require('mysql');
var express = require('express');

var app = express();

var TEST_DATABASE = 'OA';
// var TEST_TABLE = 'te';

//创建连接
var client = mysql.createClient({
    host:'localhost',
    user: 'root',
    password: '',
    port : 3306,
});

////创建数据库
//client.query('CREATE DATABASE '+TEST_DATABASE, function(err) {
//    if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
//        throw err;
//    }
//});

//不指定回调函数，如果出错，则体现为客户端错误
client.query('USE '+TEST_DATABASE);

////创建表格,插入数据
//client.query(
//    'CREATE TABLE '+TEST_TABLE+
//        '(id INT(11) AUTO_INCREMENT, '+
//        'name VARCHAR(255), '+
//        'PRIMARY KEY (id))'
//);
//
//client.query(
//    'INSERT INTO '+TEST_TABLE+' '+
//        'SET name = ?',
//    ['nodejs1']
//);
//
//var query = client.query(
//    'INSERT INTO '+TEST_TABLE+' '+
//        'SET name = ?',
//    ['nodejs2']
//);

//查询，并设置回调函数
client.query(
    'SELECT user1 FROM '+TEST_TABLE,
    function selectCb(err, results, fields) {
        if (err) {
            throw err;
        }
        //console.log(results);
        console.log(fields);
        client.end();
        app.get('fields');
    }
);

