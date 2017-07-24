var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.sign) {
        //检查用户是否已经登录，如果已登录展现的页面
        res.render('index', { title: '打包端',userInfo:req.session.userInfo });
    } else {
      //登陆
        res.redirect('http://'+req.headers.host+'/');

    }

});

module.exports = router;
