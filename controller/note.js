
/*
 * GET home page.
 */
exports.index = function(req, res){
    res.render('index',{title: 'oa', age: '66', uid: 'jsdhjsd'});
};
exports.user = function(req, res){
    res.render('user',{title: 'user page', age: '22', uid: 'page'});
};
exports.date = function(req, res){
    res.render('date',{title: 'date', age: '33', uid: '44'});
};
exports.passport = function(req, res){
    res.render('passport',{title: 'passport', age: '44', uid: '55'});
};