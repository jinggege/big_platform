var Sequelize = require("sequelize");
const DBHelper = require('./../utils/DBHelper.js')

/**
 * @description  用户
 * @example {} 
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */
class ResModel {
    
    constructor() {
        // 获取sequelize对象
        this.sequelize = DBHelper.getSequelize();
        // 数据库映射
        this.resMdoel = this.sequelize.define('big_sys_res_basic',  {
           id : {
               type : Sequelize.STRING,
               primaryKey : true
           },
           resName : {
               type : Sequelize.STRING
           },
           resIdentify : {
               type : Sequelize.STRING
           },
           resUrl : {
               type : Sequelize.STRING
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
        this.sequelize.transaction().then( (t) => {
            return this.resMdoel.create(model).then( (ret) => {
                // 插入成功，提交事物
                t.commit();
            }).catch( (err) => {
                console.error("插入角色失败：", err);
                t.rollback();
            });
        });
    }


}

module.exports = new ResModel();