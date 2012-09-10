express = require('express');
path = require('path');
route = require('./route.js');
config = require('./config.js').config;
var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    //正常配置
//    app.use(express.bodyParser());
    //上传图片插件服务配置
    app.use(express.bodyParser({
        uploadDir : config.tmp_upload_path//express的临时上传路径
    }));
    app.use(express.cookieParser());
    app.use(express.session({
        secret : config.session_secret,
    }));
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.errorHandler({ dumpExceptions: true }));
});

route(app);// route
app.configure(config.environment, function () {
    app.use(express.errorHandler());
});
app.listen(config.app_port, function(){
    console.log('dao is listening on'+config.app_port);
});
