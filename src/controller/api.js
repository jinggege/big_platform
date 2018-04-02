
var URL = require("url");
var Render = require(global.CODE_PATH+"/config/render_cfg.js");
var DBControl = require('./control_db.js');
var U = require('./util.js');


/**
 * 课程
 */

class API{

    constructor(){

     }

    async control(ctx){
        var args = URL.parse(ctx.req.url,true).query;
        
        var reqType = ctx.params.type;
        var body = ctx.request.body;

        switch(reqType){

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

            //获取课程章节列表
            case 'getCapterList' :
                var courseId = args.course_id;
                var result   = await  DBControl.getCourseCapter( courseId );
                var respData = U.formatResp(0,result,'ok');
                ctx.body     = respData;
            break;

            //获取用户课程列表
            case 'getUserCourse' :
                var uid = ctx.session.uid;
                if(!uid){
                    ctx.body = U.formatResp(1,result,'未登录');
                    return;
                }
                var result   = await  DBControl.getUserOwnCourse( uid );
                var respData = U.formatResp(0,result,'ok');
                ctx.body     = respData;
            break;

            //获取用户信息
            case 'getUserInfo' :
                var uid = ctx.session.uid;
                var result   = await  DBControl.getUserInfo( uid );
                delete result['pwd'];
                var respData = U.formatResp(0,result,'ok');
                ctx.body     = respData;
            break;

            //安全码
            case 'getSalfCode' :
                var selfCode = U.createSafeCode();
                ctx.session.salf_code = U.Base64().encode( selfCode );
                var respData = U.formatResp(0,selfCode,'ok');
                ctx.body     = respData;
            break;
            
             //购买课程
             case 'buy' :
                var uid = ctx.session.uid;
                var result   = await  DBControl.buyCourse( uid, body.course_id, body.author_id );
                var respData = U.formatResp(0,{},'ok');
                ctx.body     = respData;
            break;

             //推荐课程
            case 'recommend' :
                var uid = ctx.session.uid;
                var recommendList  = await  DBControl.getRemommendCourse( );
                var respData = U.formatResp(0,recommendList,'ok');
                ctx.body     = respData;
            break;

            
        }
        
    }



}


module.exports = new API();