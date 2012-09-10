var sys = require('sys');
var Client = require('mysql').Client;
var client = new Client();
client.user = 'root';
client.password = '';
client.host='localhost';
client.query('USE test');     //如果MySQL中没有库表，赶紧建。
http = require("http");
url = require("url");
console.log('connect');
client.connect(function(error,results){
    if(error){
        console.log('connect error'+error.message);
        return false;
    }
    console.log('connectd to mysql');
    ClientConnectiongReady(client);
})
ClientConnectiongReady = function(client){
    client.query('USE test',function(error,results){
        if(error){
            console.log('connect error'+error.message);
            return;
        }
        ClientReady(client);
    });
};
ClientReady = function(client){
    var value = ['chad','lung','hello'];
    client.query('INSERT INTO passport SET firsename = ?,secondname =?,thirdname=?',value,function(error,results){
        if(error){
            console.log('ClientReady Error'+error.message);
            return;
        }
        console.log('Inserted: ' + results.affectedRows + ' row.');
        console.log('Id inserted: ' + results.insertId);
    });
    GetData(client);
};
GetData = function(client){
    client.query('SELECT * FROM passport',function select(error,results,fidlds){
        if(error){
            console.log('GetData Error'+error.message);
            client.end();
            return;
        }
        if(results.length>0){
            var firstResult = results[0];
            console.log('1 Name: ' + firstResult['firstname']);
            console.log('2 Name: ' + firstResult['secondname']);
            console.log('3 Name: ' + firstResult['thirdname']);
        }
    });

    client.end();
    console.log('Connection closed');

};
