const STATE = require("../config/state_code.js");

/**
 * @description  API接口统一返回数据格式
 * @example  {}
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */

class ApiData {
    
    constructor(){
        this.res = {}
    }

    /**
     * 基础方法，需要传入三个参数
     * 
     * @param {*} code 状态码
     * @param {*} msg 成功或者失败消息
     * @param {*} data 数据
     */
    ret(code, msg, data) {
        this.res.code = code;
        this.res.msg = msg;
        this.res.data = data;
        return this.res;
    }

    /**
     * 请求成功返回结果
     * 
     * @param {*} data 数据，不填则展示默认信息
     */
    ok(data) {
        return this.ret(STATE.STATE_OK.code, STATE.STATE_OK.desc, (data || {}));
    }

    /**
     * 请求异常返回结果，如果只传入一个参数，则默认为msg，code字段使用默认code
     * 
     * @param {*} code 自定义异常状态码，不填则为0
     * @param {*} msg 异常说明信息，不填为默认错误消息
     */
    err(code, msg) {
        if(arguments.length == 1)  {
            msg = code;
        }
        return this.ret(STATE.STATE_ERR.code, (msg || STATE.STATE_ERR.desc), {});
    }

}

module.exports = new ApiData();