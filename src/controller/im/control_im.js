const Request = require("../../utils/request.js");

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
    async applyRoom() {
        return await Request.request('im');
    }
 }

 module.exports = new IMCtl();
