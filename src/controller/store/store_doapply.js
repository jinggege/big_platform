var URL = require("url");
var store = require("../../model/store.js");
var IMCtl = require("./../im/control_im.js");
var U = require("../util.js");
/**
 * @description   商铺列表控制层
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */
class StoreDoApplyCtl {

    constructor(){}

    async control(ctx, next) {
        // var args = URL.parse(ctx.req.url,true).query;
        // console.log("args=", args);
        // console.log("body=",ctx.request.body);

        // 生成appid
        var appId = U.UUIDV1();

        // 申请房间号，申请成功后向数据库中插入数据
        var result = await IMCtl.applyRoom(appId);

        console.log(result);
        // // 获取参数
        var model = ctx.request.body;

        await store.insert(model);

        ctx.body = "ok";
    }
}

module.exports = new StoreDoApplyCtl();