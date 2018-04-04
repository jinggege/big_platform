const store = require("../../model/store.js");
const RET = require("../../utils/ApiData.js");

/**
 * @description  商铺申请控制层
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */
class StoreApplyCtl {

    constructor(){}

    async control(ctx) {
        console.log("商家发起注册申请");
        // 获取参数
        ctx.body = RET.ok();
    }
}

module.exports = new StoreApplyCtl();