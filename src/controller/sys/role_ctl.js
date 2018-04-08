const RoleModel = require('./../../model/sys/role_basic.js');
const RET = require("./../../utils/ret_data.js");

/**
 * @description  系统角色管理
 * @example {} 
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */
 class RoleCtl {

    constructor() {

    }

    /**
     * 通过路由中的参数判断是什么请求
     * 类型：add:添加，update：修改，one:根据id查询,list：分页列表
     * 
     * @param {*} ctx 
     */
    control(ctx) {
        // 接受路由中的参数
        var type = ctx.params.type;
        // 判断，走不同的流程
        switch(type) {

            case 'add':
                console.log("添加");
                // 接受请求提中的参数
                var params = ctx.request.body;
                // 执行操作
                RoleModel.insert(params)
                .then( (ret) => {
                    console.log("ret=", ret);
                    ctx.body = "1";
                }).catch( (err) => {
                    console.log("err=", err);
                    // 异常
                    ctx.body = "3";
                });
            break;

            case 'update':
                console.log("更新");
            break;

            case 'one':
                console.log("根据id查询");
            break;

            case 'list':
                console.log("列表");
            break;
        }

    }

 }

 module.exports = new RoleCtl();