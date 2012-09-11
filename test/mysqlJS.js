var sys = require('sys');
 
var Client = require('mysql').Client;
var client = new Client();
 
client.user = 'root';
client.password = '';
 
client.connect(function(error, results) {
  if(error) {
    console.log('Connection Error: ' + error.message);
    return;
  }
  console.log('Connected to MySQL');
});