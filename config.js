exports.config = {
    name : 'oa',
    description : 'oa 是基于Node.js开发的社区系统',
    host : 'localhost',
    session_secret : 'secret',
    auth_cookie_name : 'secret',
    app_port : 3000,
    version : '0.0.1',
    environment:"development",
    // mysql config
    server : "10.10.6.75'",
    port : 3306,
    user : "oa",
    password : "123456",
    database : "oa",
    maxSockets : 80,//pool使用
    timeout : 1,//pool使用
    //上传图片路径
    tmp_upload_path : '/ejs/public/images/upload', //express的临时上传路径,需首先建立这个文件夹(在app.use(express.bodyParser({uploadDir:'/home/tmp/uploads'}));设置)
    avatar_path : '/images/avatar', //相对路径：用户自定义头像的上传地址，在/public下
//    vdisk_path :'/home/files' //绝对路径：网盘的默认主路径
};
