var Sequelize = require("sequelize");
const DBHelper = require('./../utils/DBHelper.js')

/**
 * @description  用户
 * @example {} 
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */
class UserModel {
    
    constructor() {
        // 获取sequelize对象
        this.sequelize = DBHelper.getSequelize();
        // 数据库映射
        this.userMdoel = this.sequelize.define('big_sys_user_basic',  {
           id : {
               type : Sequelize.STRING,
               primaryKey : true
           },
           realName : {
               type : Sequelize.STRING
           },
           loginNmae : {
               type : Sequelize.STRING
           },
           nickname : {
               type : Sequelize.STRING
           },
           password : {
               type : Sequelize.STRING
           },
           email : {
               type : Sequelize.STRING
           },
           createdBy : {
               type : Sequelize.STRING,
               field : 'createdBy'
           },
           createdAt : {
               type : Sequelize.STRING,
               field : 'createdAt'
           },
           updatedBy : {
               type : Sequelize.STRING,
               field : 'updatedBy'
           },
           updatedAt : {
               type : Sequelize.STRING,
               field : 'updatedAt'
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
            model.createdBy = '1';
            mdoel.updatedBy = '1';
            return this.userMdoel.create(model, { transaction : t });
        }).catch( (err) => {
            console.error("插入user失败，", err);
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

module.exports = new UserModel();