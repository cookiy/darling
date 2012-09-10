var Client = require('mysql').Client;
var client = new Client();
client.user = 'root';
client.password = '';
client.host='localhost';
client.query('USE tiny_shop');     //如果MySQL中没有库表，赶紧建。
http = require("http");
url = require("url");
var TEST_TABLE = 'te';
function getsql(){
    this.sqlinfo=function{client.query(
        'SELECT user1 FROM '+TEST_TABLE,
        function selectCb(err, results, fields) {
            if (err) {
                throw err;
            }
            //console.log(results);
            console.log(fields);
            client.end();
        }
    );
    }
}






