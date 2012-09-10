http = require("http");
url = require("url");
express = require('express');
path = require('path');
routes = require('./.'); //路由

//连接数据的一些配置
var Client = require('mysql').Client;
var client = new Client();
client.user = 'root';//用户名
client.password = '';//密码
client.host='localhost';
client.query('USE tiny_shop');     //如果MySQL中没有库表，赶紧建。




//操作语句
var select_sql='SELECT * FROM user';
var insert_sql='INSERT into tags set aa=?,bb=?';
var update_sql='update  tags set aa=? where bb=?';
var delete_sql='delete from  user where bb=?';

var server = http.createServer(function(request, response) {
    var params = url.parse(request.url, true);
//查询
    var select_=function(){
        client.query(select_sql, function selectCb(err, results, fields) {
            response.writeHeader(200, {"Content-Type": "text/html"});
            if (err) {
                throw err;
            }
            var data = '';
            for (var i=0; i<results.length; i++) {
                var firstResult = results[i];
                data += 'aa: ' + firstResult['aa']+'bb: ' + firstResult['bb'];
            }
            if (params.query && params.query.callback) {
                //console.log(params.query.callback);
                var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
                response.end(str);
            } else {

                response.end(JSON.stringify(data));//普通的json
            }
        });
    }
//增加
    var insert_=function(){
        var str=['gongshan','gongshan'];
        client.query(insert_sql,str,function(err,results){
            response.writeHeader(200, {"Content-Type": "text/html"});
            if (err) {
                throw err;
            }
            select_();
        });
    }
    //修改
    var update_=function(){
        var str=['tt','tt'];
        client.query(update_sql,str,function updates(err,results){
            response.writeHeader(200, {"Content-Type": "text/html"});
            if (err) {
                throw err;
            }
            select_();
        });
    }
    //删除
    var delete_=function(){
        str=['gongshan'];
        client.query(delete_sql,str,function(err,results){
            response.writeHeader(200, {"Content-Type": "text/html"});
            if (err) {
                throw err;
            }
            select_();
        })
    }

    select_();
});

server.listen(8080);

var sys = require("util");
sys.puts("Server running at http://localhost:8080/");