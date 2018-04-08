var Sequelize = require("sequelize");
const DBHelper = require('./../utils/DBHelper.js')

/**
 * @description  用户、角色关联
 * @example {} 
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */
class UserRoleModel {
    
    constructor() {
        // 获取sequelize对象
        this.sequelize = DBHelper.getSequelize();
        // 数据库映射
        this.userRoleMdoel = this.sequelize.define('big_sys_user_role',  {
           userId : {
               type : Sequelize.STRING,
               primaryKey : true,
               field : 'user_id'
           },
           roleId : {
               type : Sequelize.STRING,
               primaryKey : true,
               field : 'role_id'
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
     * @param {*} callback 回调函数，有两个参数：(ret, t)，ret标识是否执行成功，t表示执行的事物
     */
    bulkInsert(modelArr, callback) {
        this.sequelize.transaction().then( (t) => {
            this.userRoleMdoel.bulkCreate(modelArr, this.userRoleMdoel, {
                transaction : t,
                type : Sequelize.QueryTypes.INSERT
            }).then( (ret) => {
                callback(1 ,t);
            }).catch( (err) => {
                console.error("批量插入user_role失败：", err);
                callback(0, t);
            });
        });
    }

}

module.exports = new UserRoleModel();