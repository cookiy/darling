var site = require('./controller/site.js');
var contacts = require('./controller/contacts.js');
var date = require('./controller/calendars.js');
var note = require('./controller/note.js');
var upload = require('./controller/upload.js');
var sysuser = require('./controller/systemuser.js');
var notice = require('./controller/notice.js');
var equipment = require('./controller/equipment.js');
var room = require('./controller/conferroom.js');
var org = require('./controller/organization.js');

exports = module.exports = function(app) {
     /*
     * 登陆页面
     * get-signin
     * post-signin
    */
    app.get('/signin',site.signin);
    app.post('/signin', site.signin);

    /*
     * 首页
     * 主页-index
     * 日程表-ischedule
     * 工作态度-iwork
     * 待办事项-ibacklog
    */
    app.get('/', site.index);
    app.get('/index', site.index);
    app.get('/signout', site.signout);
    app.post('/ischedule', site.ischedule);
    app.post('/iwork', site.iwork);
    app.post('/ibacklog', site.ibacklog);
    
    /*
     * 短信联系人
     * 编辑-edit
     * 添加-add
     * 删除-del
     * 分页
    */
    app.get('/userlist',contacts.list);
    app.get('/sendmsg',contacts.index);
    app.get('/records',contacts.message)
    app.get('/contactst',contacts.test);
    app.get('/contacts/addSnsGroupGet', contacts.addSnsGroupGet);
    app.post('/contacts/AddGroup', contacts.addSnsGroup);
    app.post('/contacts/DeleGroup', contacts.deleGroup);
    app.post('/contacts/UpdateGroup', contacts.updateGroup);
    app.post('/contacts/PageLoad', contacts.pageLoad);
    app.post('/contacts/GetListByGroup', contacts.getListByGroup);
    app.post('/contacts/AddUser', contacts.addUser);
    app.post('/contacts/UpdateUser', contacts.updateUser);
    app.post('/contacts/DeleteUser', contacts.deleteUser);
    app.post('/contacts/loadalluser', contacts.loadAllUser);
    app.post('/contacts/GetUserListByPageIndex', contacts.getUserListByPageIndex);
    app.post('/contacts/edit', contacts.edit_info);
    app.post('/contacts/queryAllSnsUsers', contacts.queryAllSnsUsers);

    /*
     * 日程
     * 编辑-edit
     * 获取-add
    */
    app.get('/calender', date.index);

    /*
     * 头像上传
    */
    app.get('/start', upload.start);
    app.get('/upload', upload.upload);
    app.post('/upload', upload.upload);
    app.get('/show', upload.show);
    app.post('/userPhoto', upload.userPhoto);

    /*
     * 系统用户
     * 编辑-edit
     * 添加-add
     * 删除-del
    */
    app.get('/showusers',sysuser.userlist);
    app.get('/edituser',sysuser.edituser);
    app.get('/GetAllSysUser',sysuser.GetAllSysUser);
    app.get('/GetDepartment',sysuser.GetDepartment);
    app.get('/GetSysUserByDepartmentID',sysuser.GetSysUserByDepartmentID);
    app.post('/SaveSysUser',sysuser.SaveSysUser);
    app.post('/DeleteSysUser',sysuser.DeleteSysUser);
    app.post('/AddSysUser',sysuser.AddSysUser);
    /*
     * 设备,会议室登记device
    */
    app.get('/equipment',equipment.equipment);
    app.get('/conroom',room.conferroom);
    /*
     * 短信sms
    */
    /*
     * 通知notice
    */
    app.get('/notice',notice.publishNotice);


    /*
     * 组织结构
     */
    app.get('/org',org.showorganization);
    /*
     * 公文
    */
    app.get('/note', note.index);
    app.get('/note/add', note.add);
//    app.get('*', function(req, res){
//        res.render('404.html', {
//            title: 'No Found'
//        })
//    });
};
