var Sequelize = require("sequelize");
const DBHelper = require('./../utils/DBHelper.js')

/**
 * @description  角色、资源关联
 * @example {} 
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */
class RoleResModel {
    
    constructor() {
        // 获取sequelize对象
        this.sequelize = DBHelper.getSequelize();
        // 数据库映射
        this.roleResModel = this.sequelize.define('big_sys_role_res',  {
           roleId : {
               type : Sequelize.STRING,
               primaryKey : true,
               field : 'role_id',
               allowNull : false
           },
           resId : {
               type : Sequelize.STRING,
               primaryKey : true,
               field : 'res_id',
               allowNull : false
           },
           perms : {
               type : Sequelize.STRING,
               allowNull : false
           }
        }, {
            freezeTableName : true, // Model 对应的表明和
            timestamps : false
        });
    }

    // =========== 数据库操作 ===============

    /**
     * 批量插入
     * 
     * @param {*} modelArr 模型数组
     * @param {*} transaction 事物对象，主要作为级联插入时，做事物管理
     */
    bulkInsert(modelArr, transaction) {
        return this.sequelize.transaction( (t) => {
            return this.roleResModel.bulkCreate(modelArr, this.roleResModel, {
                transaction : t,
                type : Sequelize.QueryTypes.INSERT
            }).then( (ret) => {
                // 执行成功，提交传入的事物
                transaction.commit();
            }).catch( (err) => {
                console.error("批量插入role_res失败：", err);
                // 回滚事物
                transaction.rollback();
                // 跑出异常给上层，否则无法在controller中判断是否成功
                throw new Error(err);
            });
        });
    }

}

module.exports = new RoleResModel();