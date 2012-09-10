var config = require('../config.js').config;
var sanitize = require('validator').sanitize;
var Util = require('../lib/util.js');
var qs = require('querystring');
var formidable = require('formidable');
var exec = require('child_process').exec;
var fs = require('fs');
//var Canvas = require('canvas');
exports.start = function(req, res){
    if (!req.session || !req.session.user) {
        res.render('./upload/start', {
            error : '你还没有登录。'
        });
        return;
    }
    else{
        res.render('./upload/start', {
            error : '。'
        });
        return;
    }

};
exports.upload = function(req, res){
    console.log("handler 'upload' was called.");
    var method = req.method.toLowerCase();
    if (method == 'get') {
        res.render('./upload/upload');
    }
    if (method == 'post') {
        console.log("Request handler 'upload' was called.");

        var form = new formidable.IncomingForm();
        console.log('about to pars')
        console.log(form);
//        form.parse(req, function(error, fields, files) {
        console.log('parsing done')
        console.log(req.files);
//        fs.renameSync("./test.png", files.upload.path+"x.png")
        fs.renameSync(req.files.upload.path, "./test.png")
        res.render('./upload/upload');
//        })
    }
};
exports.show = function(req, res){
    console.log('request handler \'show\' was called...')
    fs.readFile("./test.png", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, {
                "Content-Type": "text/plain",
                'Content-length': "stat.size"
            });
            res.write(error + "\n");
            res.end();
        } else {
            res.writeHead(200, {
                "Content-Type": "image/jpg",
                'Content-length': "stat.size"
            });
            res.write(file, "binary");
            res.render('./upload/show');
        }
    });
};
exports.userPhoto = function(req, res){
    console.log("handler 'userPhoto' was called.");
    var method = req.method.toLowerCase();
    var img =req.body.user_pphoto;
    var x1 = sanitize(req.body.x1).trim();
    var x2 = sanitize(req.body.x2).trim();
    var y1 = sanitize(req.body.y1).trim();
    var y2 = sanitize(req.body.y2).trim();
    fs.readFile(config.tmp_upload_path + 'test.png', function(err, squid){
        if (err) throw err;
        img = new Image;
        img.src = squid;
        ctx.drawImage(img, x1, x2, img.width / 4, img.height / 4);
    });
    res.end();
};
exports.donwloadZip = function(req, res) {
//    require('path').exists(userFile, function(exists) {
//        console.log("exists: ", exists);
//        if (exists) {
//            fs.readFile(userFile, "binary", function(err, date) {
//                res.writeHead(200, {"Content-Type": "application/zip"});
//                res.write(date, "binary");
//                res.end();
//            });
//        }
//    });
    //上面的代码可以处理小文件，如果文件太大的话，由于 date 数据会保存在内存中，可能会造成内存不足
    require('path').exists(userFile, function(exists) {
        console.log("exists: ", exists);
        if (exists) {
            var fileStream = fs.createReadStream(userFile);
            res.writeHead(200, {"Content-Type": "application/zip"});
            fileStream.pipe(res);
            fileStream.on("end", function() {
                res.end();
            })
        }
    });
}


