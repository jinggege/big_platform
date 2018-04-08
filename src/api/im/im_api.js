var store = require("../../model/store/store.js");
const RET = require("../../utils/ret_data.js");

/**
 * @description  商铺控制层
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */
class IMApi {

    constructor(){}

    async control(ctx) {
        // 获取参数
        await store.findAppIdList()
        .then( (data) => {
            ctx.body = RET.ok(data);
        }).catch( (err) => {
            ctx.body = RET.err();
        });
        
    }
}

module.exports = new IMApi();