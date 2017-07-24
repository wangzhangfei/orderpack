var express = require('express');
var router = express.Router();
var request = require('request');
var pack=require('../package.json');
var fiex=pack.serverUrl;//url地址
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('login', { title: '打包端' });
});


//登录接口
router.post('/30e77ba53855679c', function(req, res, next) {

    var loginName=req.body.loginName;
    var loginPassword=req.body.loginPwd;
    var url=fiex+"/o/account/login?phone="+loginName+"&password="+loginPassword;
    console.log(url);
    request(url, function (error, response, body) {//request必须加载模块

        if (!error && response.statusCode == 200) {

            try{
                //访问成功，返回直接返回数据，不做任何处理
                var json = JSON.parse(body);
                var resJson={};
                var status=200;
                console.log(json);
                if(json['success']===true && json['data']!=null ){
                    var resJsons={'realName':json['data']['name'],
                        'phone':json['data']['phone'],
                        'loginKey':json['data']['loginKey'],
                        'companyId':json['data']['companyId']};
                    //存储用户登录信息
                    req.session.sign = true;
                    req.session.userInfo = resJsons;

                }else {
                     resJson=json;
                    status=101;
                }
                res.json({status: status, data: [resJson]});
            }catch (e){
              console.log(e);
                //服务器异常
                res.json({status: 202, data: [e]});
            }

        } else {
            //服务器异常
            res.json({status: 201, data: [error]});

        }
    });
});

module.exports = router;
