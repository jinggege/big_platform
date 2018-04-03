const Request = require("../../utils/request.js");
const reqCfg = require("../../config/req_cfg.js");

/**
 * @description im交互服务
 * @author Secret
 * @version 1.0
 */
 class IMCtl {

    constructor(){
    }


    /**
     * 申请room，在用户申请注册时候出发该操作
     */
    async applyRoom(appId) {
        var path = reqCfg.im.path;
        // 将参数拼接
        path += "?appId=" + appId;
        reqCfg.im.path = path;
        return await Request.request(reqCfg);
    }
 }

 module.exports = new IMCtl();