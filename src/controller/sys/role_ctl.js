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
     * 类型：add:添加，update：修改，one:根据id查询,list：条件查询分页列表
     * 
     * @param {*} ctx 
     */
    async control(ctx) {
        // 接受路由中的参数
        var type = ctx.params.type;
        // 判断，走不同的流程
        switch(type) {
            // 添加
            case 'add':
                // 接受请求提中的参数
                var params = ctx.request.body;
                // 执行操作
                await RoleModel.insert(params).then( (ret) => {
                    ctx.body = RET.ok();
                }).catch( (err) => {
                    console.error("======err======>>>>>", err);
                    ctx.body = RET.err(err);
                });
            break;

            // 更新
            case 'update':
                // 接受请求提中的参数
                var params = ctx.request.body;
                // 执行更新
                await RoleModel.update(params).then( (ret) => {
                    ctx.body = RET.ok();
                }).catch( (err) => {
                    console.error("========error========>>>>>>", err);
                    ctx.body = RET.err( err );
                });
            break;

            // 物理删除
            case 'del':
                var params = ctx.request.body;
                await RoleModel.delete(params).then( (ret) => {
                    ctx.body = RET.ok();
                }).catch( (err) => {
                    console.error("========error========>>>>>>", err);
                    ctx.body = RET.err(err);
                });

            break;

            // 根据id查询
            case 'one':

                // 获取参数
                var params = ctx.request.body;

                await RoleModel.findOne(params).then( (ret) => {
                    ctx.body = RET.ok(ret);
                }).catch( (err) => {
                    console.error("========error========>>>>>>", err);
                    ctx.body = RET.err(err);
                });
            break;

            // 条件查询列表
            case 'list':

                // 查询条件
                var param = ctx.request.body;

                await RoleModel.findList(param, 3, 0).then( (ret) => {
                    ctx.body = RET.ok(ret);
                }).catch( (err) => {
                    console.error("========error========>>>>>>", err);
                    ctx.body = RET.err(err);
                });

            break;
        }

    }

 }

 module.exports = new RoleCtl();