var sys = require('util');  
console.log('Connecting to MySQL...');  
var client = require('mysql').createClient({'host':'10.10.6.75','port':3306,'user':'oa','password':'123456'});
console.log('Connected to MySQL automatically');

ClientConnectionReady = function(client)  
{
    console.log('ClientConnectionReady');  
    client.query('USE oa', function(error, results) {
        if(error) {  
            console.log('ClientConnectionReady Error: ' + error.message);  
            client.end();
            console.log('Error end');  
            return;  
        }  
        console.log('Connected to MySQL succeed');
        GetData(client);  
    });  
}; 

ClientReady = function(client)  
{  
    var values = ['cookiy', '11', '001'];  
    client.query('INSERT INTO sns_group SET name = ?, user_id = ? , id = ?', values,  function(error, results) {  
            if(error) {  
                console.log("ClientReady Error: " + error.message);  
                client.end();  
                return;  
            }  
            // console.log('Inserted: ' + results.affectedRows + ' row.');  
            // console.log('Id inserted: ' + results.insertId);
             console.log('you are good');  
        }  
    );  
    // GetData(client);
    client.end();  
}; 
GetData = function(client)  
{  
    client.query(  
        'SELECT * FROM user',  
        function selectCb(error, results, fields) {  
            if (error) {  
                console.log('GetData Error: ' + error.message);  
                client.end();  
                return;  
           } 

           // Uncomment these if you want lots of feedback  
           console.log('Results:');  
           console.log(results);  
           console.log('Field metadata:');  
           console.log(fields);  
           // console.log(sys.inspect(results));  
           // if(results.length > 0)  
           // {  
           //     var firstResult = results[0];  
           //     console.log('First Name: ' + firstResult['aa']);  
           //     console.log('Last Name: ' + firstResult['bb']);  
           //     console.log('Message: ' + firstResult['cc']);  
           // }  
    });  
    client.end();  
    console.log('Connection closed');  
}; 
ClientConnectionReady(client); 