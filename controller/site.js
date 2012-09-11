var check = require('validator').check;
var sanitize = require('validator').sanitize;
var config = require('../config.js').config;
var userDao = require('../dao/user.js');
var Util = require('../lib/util.js');

exports.oa = function (req, res) {
    res.render('./test/oa', {name:'教育司', uid_photo_url:'images/avatar.jpg', uid:'oa001'});
};
exports.index = function (req, res) {
//     if (!req.session.user) {
//         res.redirect('/signin');
//    }else{
         res.render('index');
//    }
}
//login
exports.signin = function(req, res) {
    var method = req.method.toLowerCase();
    if (method == 'get') {
        res.render('./login/login', {
            error : '你好啊'
        });
        return;
    }
    if (method == 'post') {
       var name = sanitize(req.body.name).trim();
       var pass = sanitize(req.body.pass).trim();
        console.log(typeof (name));
        console.log(typeof (pass));
        if (name == '' || pass == '') {
            res.render('./login/login', {
                error : '信息不完整。'
            });
            return;
        }
//        userDao.queryUserByLoginName(loginname, function(err, user) {
//            if (err)
//                return next(err);
//            if (!user) {
//                res.render('sign/signin', {
//                    error : '这个用户不存在。'
//                });
//                return;
//            }

//            pass = Util.md5(pass);
//            if (pass != user.pwd) {
//                res.render('sign/signin', {
//                    error : '密码错误。'
//                });
//                return;
//            }
//
//            gen_session(user, res);// store session cookie
            res.redirect('index');

    }
};
exports.signout = function(req, res, next) {
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, {
        path : '/'
    });
    res.redirect('home');
};
function gen_session(user, res) {
    var auth_token = Util.encrypt(user.loginname + '\t' + user.pass, config.session_secret);
    res.cookie(config.auth_cookie_name, auth_token, {
        path:'/',
        maxAge:1000 * 60 * 60 * 24 * 7
    }); // cookie 有效期1周
};

