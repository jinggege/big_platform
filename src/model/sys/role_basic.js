const Sequelize = require("sequelize");
const DBHelper = require('./../utils/DBHelper.js')
const RoleResModel = require('./role_res.js');

/**
 * @description  角色
 * @example {} 
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */
class RoleModel {
    
    constructor() {
        // 获取sequelize对象
        this.sequelize = DBHelper.getSequelize();
        // 数据库映射
        this.roleMdoel = this.sequelize.define('big_sys_role_basic',  {
           id : {
               type : Sequelize.STRING,
               primaryKey : true,
               allowNull : false
           },
           roleName : {
               type : Sequelize.STRING,
               field : 'role_name',
               allowNull : false
           }
        }, {
            freezeTableName : true, // Model 对应的表明和
            timestamps : false
        });
    }

    // =========== 数据库操作 ===============

    /**
     * 添加数据
     * 
     * @param {*} model 
     */
    insert (model) {
        return this.sequelize.transaction( (t) => {
            return this.roleMdoel.create(model, { transaction : t });
        });
        //以上的这种方式不行，不知为何，还在探索中
        // 上面的这种方式已经解决，需要return添加create的promise
        // this.sequelize.transaction().then( (t) => {
        //     return this.roleMdoel.create(model).then( (ret) => {
        //         // 插入成功，提交事物
        //         t.commit();
        //     }).catch( (err) => {
        //         console.error("插入角色失败：", err);
        //         t.rollback();
        //     });
        // });
    }

    /**
     * 插入个角色，同时插入角色对应的资源权限
     * 
     * @param {*} model 角色模型， eg：{id:1, roleName:'2'}
     * @param {*} resArr 资源权限数组，eg：[{roleId:1,resId:2, perms:'1,2,3,4'}]；
     *                   权限代表值：1：添加，2：修改，3：删除，4：查询
     */
    insertWithRes(model, resArr) {
        return this.sequelize.transaction( (t) => {
            // 先插入角色，如果角色插入成功，则在插入资源权限
            return this.roleMdoel.create(model, { transaction : t})
            .then( (ret) => {
                // 插入成功，插入资源列表
                return RoleResModel.bulkInsert(resArr, t);
            });
        });
    }

}

module.exports = new RoleModel();