
var URL    = require("url");
var Base64 = require('js-base64').Base64;
var Render = require(global.CODE_PATH+"/config/render_cfg.js");
var DBControl = require('../control_db.js');
var U         = require('../util.js');
var ErrorType = require('../../config/error_type.js');

/**
 * 课程
 */

class Account{

    constructor(){ }

    async control(ctx){
        var args = URL.parse(ctx.req.url,true).query;

        if( U.validateUser(ctx.session) ){
            ctx.redirect('/wl/user/my');
            return;
        }
        
        var reqType = ctx.params.type;
        switch(reqType){
            case 'home' :
                ctx.body = await Render("h5/account");
            break;
            case 'login' :
                var loginInfo = ctx.request.body;

                var result = await  DBControl.login(loginInfo);
                var flag = false;
                if(result.length) flag = true;
                var respData = U.formatResp(0);
                if(flag){
                    ctx.session.phone   = loginInfo.phone;
                    ctx.session.uid     = result[0].uid;
                    ctx.session.isLogin = true;
                    ctx.body = respData;
                }else{
                    ctx.body = U.formatResp(1);
                }
                
            break;

            case 'reg':
                var regInfo = ctx.request.body;
                regInfo.regTime   = new Date().getTime();

                if( regInfo.code == ""){
                    ctx.body = U.formatResp(1, {}, "注册码错误!");
                    return;
                }

                regInfo.uid       = U.createID();
                regInfo.pwd = Base64.encode( 123456 );
                var result  = await  DBControl.reg(regInfo);
                var flag    = U.checkInsertStatus(result);
                if(flag){
                    ctx.body = U.formatResp(0,{}, "注册成功!");
                }else{
                    ctx.body = U.formatResp(1, {}, "注册失败!");
                }

            break;

            case 'userinfo' :
                ctx.body = await Render("h5/userinfo");
            break;


            
        }
        
    }



}


module.exports = new Account();