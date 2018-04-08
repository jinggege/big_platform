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
        this.roleModel = this.sequelize.define('big_sys_role_basic',  {
           id : {
               type : Sequelize.STRING,
               primaryKey : true,
               allowNull : false
           },
           roleName : {
               type : Sequelize.STRING,
               field : 'role_name',
               allowNull : false
           },
           createdBy : {
               type : Sequelize.STRING,
               field : 'created_by'
           },
           createdAt : {
               type : Sequelize.DATE,
                field : 'created_at'
           },
           updatedBy : {
               type : Sequelize.STRING,
               field : 'updated_by'
           },
           updatedAt : {
               type : Sequelize.DATE,
               field : 'updated_at'
           }
        }, {
            freezeTableName : true, // Model 对应的表明和
            timestamps : true
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
            // 设置创建和更新人
            model.createdBy = '1';
            model.updatedBy = '1';
            return this.roleModel.create(model, { transaction : t });
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
            return this.roleModel.create(model, { transaction : t})
            .then( (ret) => {
                // 插入成功，插入资源列表
                return RoleResModel.bulkInsert(resArr, t);
            });
        });
    }

    /**
     * 更新数据
     * 
     * @param {*} model 要更新的角色数据
     * @param {*} options 选择更新的字段，非必须
     */
    update(model, options) {
        if(options == null || option == undefined) {
            options = {
                fields : ['roleName', 'updatedBy'],
                where : {
                    id : model.id
                }
            }
        }
        // 设置更新人
        model.updatedBy = '1';
        return this.roleModel.update(model, options);
    }

    /**
     * 删除
     * 
     * @param {*} model 模型
     */
    delete(model) {
        return this.sequelize.transaction( (t) => {
            return this.roleModel.destroy({
                where : {
                    id : model.id
                },
                force : true,
                transaction : t
            });
        });
    }

    /**
     * 根据条件查询一个结果
     * 
     * @param {*} model 
     */
    findOne(model) {
        return this.roleModel.findOne({
            where : model,
            attributes : ['id', 'roleName']
        });
    }

    /**
     * 查询列表，分页
     * 
     * @param {*} model 查询条件
     * @param {*} limit 每页多少条
     * @param {*} offset 跳过多少条
     */
    findList(model, limit, offset) {
        return this.roleModel.findAndCount({
            where : model,
            order : [
                ['id' , 'DESC'],
                ['updatedAt' , 'DESC']
            ],
            attributes : ['id', 'roleName'],
            limit : limit,
            offset : offset
        });
    }

}

module.exports = new RoleModel();