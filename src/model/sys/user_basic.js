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
            return this.userMdoel.create(model, { transaction : t });
        }).catch( (err) => {
            console.error("插入user失败，", err);
        });
        //以上的这种方式不行，不知为何，还在探索中
        // this.sequelize.transaction().then( (t) => {
        //     return this.userMdoel.create(model).then( (ret) => {
        //         // 插入成功，提交事物
        //         t.commit();
        //     }).catch( (err) => {
        //         console.error("插入角色失败：", err);
        //         t.rollback();
        //     });
        // });
    }


}

module.exports = new UserModel();