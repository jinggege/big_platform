var storeModel = require("../../model/store.js");
var IMModel = require("./../../model/im.js");
var U = require("../util.js");
const RET = require("../../utils/ApiData.js");

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

        // 获取参数
        var model = ctx.request.body;

        // 生成appid
        var appId = U.UUIDV1();

        // 申请房间号，申请成功后向数据库中插入数据
        await IMModel.applyRoom(appId).then( (data) => {
            console.log("请求im服务返回结果：" , data);
            // 向数据库中插入数据
            storeModel.insert(model);
        }).then( (data) => {
            // 执行成功
            ctx.body = RET.ok();
        }).catch( (err) =>{
            ctx.body = RET.err();
        });

    }
}

module.exports = new StoreDoApplyCtl();