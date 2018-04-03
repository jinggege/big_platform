var store = require("../../model/store.js");

/**
 * @description  商铺控制层
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */
class StoreListCtl {

    constructor(){}

    async control(ctx) {
        // 获取参数
        var res = await store.findAppIdList();
        ctx.body = res;
    }
}

module.exports = new StoreListCtl();