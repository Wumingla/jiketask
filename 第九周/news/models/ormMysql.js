var orm = require("orm");
var formidable = require('formidable');
var fs = require('fs');

function ormMysql() {};

orm.connect("mysql://root:@localhost/bd", function(err, db) {
    if (err) throw err;

    var News = db.define("news", {
        newsid: {
            type: 'serial',
            key: true
        },
        newstitle: String,
        newsimg: String,
        newscontent: String,
        headlines: String,
        addtime: Date
    });

    var Users = db.define("users", {
        uId: {
            type: 'serial',
            key: true
        },
        user: String,
        password: String,
        cookie: String
    });

    //查询数据
    ormMysql.prototype.select = function(req, db, limit, callback) {
        if (db == "News") {
            var startNum = req.params.startNum;
            var conditions = req.query;
            if (startNum != 'all') {
                conditions.newsid = orm.lt(startNum);
            }
            News.find(conditions, {
                limit: limit
            }, ["newsid", "Z"], function(err, news) {
                callback(err, news);
            })
        } else if (db == "Users") {
            Users.find(req.body, function(err, user) {
                callback(err, user);
            })
        }
    }

    //添加数据
    ormMysql.prototype.updata = function(req, callback) {
        var form = new formidable.IncomingForm(); //创建上传表单
        form.encoding = 'utf-8'; //设置编辑
        form.uploadDir = 'public/images/'; //设置上传目录
        form.keepExtensions = true; //保留后缀
        form.multiples = true;
        form.parse(req, function(err, fields, files) {
            var conditions = fields;
            var imgArr = "";
            if (files.fulAvatar) {
                for (var i = 0; i < files.fulAvatar.length; i++) {
                    var imgName = files.fulAvatar[i].name;
                    var newPath = form.uploadDir + imgName;
                    imgArr += "images/" + imgName + ",";
                    console.log(newPath);
                    fs.renameSync(files.fulAvatar[i].path, newPath); //修改名字
                }
            }
            conditions.newsimg += imgArr;
            conditions.addtime = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
            News.create(conditions, function(err, results) {
                callback(err, results);
            })
        })
    }

    // 删除
    ormMysql.prototype.ormDelete = function(req, collback) {
        News.find(req.query).remove(function(err) {
            collback(err);
        });
    }

    //修改
    ormMysql.prototype.ormsave = function(req, collback) {
        var form = new formidable.IncomingForm(); //创建上传表单
        form.encoding = 'utf-8'; //设置编辑
        form.uploadDir = 'public/images/'; //设置上传目录
        form.keepExtensions = true; //保留后缀
        form.multiples = true;
        form.parse(req, function(err, fields, files) {
            var conditions = fields;
            News.find({
                newsid: conditions.newsid
            }, function(err, news) {
                var imgArr = "";
                if (files.fulAvatar) {
                    for (var i = 0; i < files.fulAvatar.length; i++) {
                        var imgName = files.fulAvatar[i].name;
                        var newPath = form.uploadDir + imgName;
                        imgArr += "images/" + imgName + ",";
                        fs.renameSync(files.fulAvatar[i].path, newPath); //修改名字
                    }
                }
                conditions.newsimg += imgArr;
                news[0].newstitle = conditions.newstitle;
                news[0].newsimg = conditions.newsimg;
                news[0].newscontent = conditions.newscontent;
                news[0].headlines = conditions.headlines;
                news[0].addtime = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
                news[0].save(function(err){
                    collback(err);
                })
            });
        })
    }

});

Date.prototype.Format = function(fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


module.exports = new ormMysql;
