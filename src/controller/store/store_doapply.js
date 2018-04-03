var URL = require("url");
var store = require("../../model/store.js");
var IMCtl = require("./../im/control_im.js");

/**
 * 商铺列表控制层
 */
class StoreDoApplyCtl {

    constructor(){}

    async control(ctx, next) {
        // var args = URL.parse(ctx.req.url,true).query;
        // console.log("args=", args);
        // console.log("body=",ctx.request.body);

        // 申请房间号，申请成功后向数据库中插入数据
        var result = await IMCtl.applyRoom();

        console.log(result);
        // 获取参数
        var model = ctx.request.body;

        await store.insert(model);

        ctx.body = "ok";
    }
}

module.exports = new StoreDoApplyCtl();