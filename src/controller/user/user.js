
var URL    = require("url");
var Base64 = require('js-base64').Base64;
var Render = require(global.CODE_PATH+"/config/render_cfg.js");
var DBControl = require('../control_db.js');
var U         = require('../util.js');
var ErrorType = require('../../config/error_type.js');

/**
 * 课程
 */

class User{

    constructor(){ }

    async control(ctx){
        var args = URL.parse(ctx.req.url,true).query;
        
        var reqType = ctx.params.type;
        var uid = ctx.session.uid;

        switch(reqType){
            case 'my' :
                ctx.body = await Render("h5/userinfo", {uid:uid? uid:0 } );
            break;
        }
        
    }



}


module.exports = new User();