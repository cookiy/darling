/**
 * Module dependencies.
 */
express = require('express');
var express, routes, http, path;
routes = require('./.');
http = require('http');
path = require('path');
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});
app.get('/', routes.index);
app.get('/aa',routes.aa);
app.listen(3000, function(){
    console.log('dao is listening on 3000');
});