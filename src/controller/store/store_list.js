var store = require("../../model/store.js");

/**
 * 商铺控制层
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