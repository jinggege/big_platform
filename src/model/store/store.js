/**
 * @description 商铺信息
 * @author Secret
 * @version 1.0
 */

 var Sequelize = require("sequelize");
 var DBHelper = require("./../utils/DBHelper.js");

 class StoreModel {

    constructor(){
        this.sequelize = DBHelper.getSequelize();
        // 如果连接池没有初始化，则进行初始化操作
        this.store = this.sequelize.define('big_store_basic', {
            id : {
                type : Sequelize.STRING,
                primaryKey : true
            },
            sname : {
                type : Sequelize.STRING
            },
            appId : {
                type : Sequelize.STRING,
                field: 'app_id'
            },
            email : {
                type : Sequelize.STRING
            },
            phone : {
                type : Sequelize.STRING
            },
            serviceTel : {
                type : Sequelize.STRING,
                field : 'service_tel'
            },
            address : {
                type : Sequelize.STRING
            }
        }, {
            timestamps: false,
            freezeTableName: true // Model 对应的表名将与model名相同
        });
    }

    // =========== 数据库操作 ====================
    
    /**
     * 添加数据
     * 
     * @param {*} store 
     */
   insert(model) {
       // 自动事物管理不起作用
        this.sequelize.transaction().then(t => {
            // 在事物中操作的部分代码
           return this.store.create(model).then(ret => {
                // 正常提交事物
                t.commit();
            }).catch(err => {
                // 出现异常，事物回滚
                t.rollback();
                throw new Error(err);
            });
       });
       
   }


   
   /**
    * 根据id查询结果
    * 
    * @param {*} id 
    */
   findById(id) {
        return this.store.find({
            where : { 
                id : id
            }
        });
   }

   /**
    * 查询所有的结果
    */
   findAppIdList() {
       return this.store.findAll( { attributes : ['appId'] } );
   }

 }

 module.exports = new StoreModel();