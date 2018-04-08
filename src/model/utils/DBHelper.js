const Sequelize = require('sequelize');

/**
 * @description 数据库辅助工具类，获取sequelize对象，进行数据库操作
 * @author Secret
 * @version 1.0
 */
class DBHelper {

    constructor(){
        this.sequelize = null;
    }

    /**
     * 启动服务时调用，初始化数据库连接池，链接数据库服务
     */
    connect(cfg) {
        console.log("==== 初始化数据库连接池 ===");
        // platform模块
        var dbCFG = cfg.platform;
        this.sequelize = new Sequelize(dbCFG.database, dbCFG.user, dbCFG.password, {
            host: dbCFG.host,
            dialect: dbCFG.dialect,
            operatorsAliases: false,
            define : {
                underscored : true // 字段下划线（_）来分割（驼峰命名风格）
            },

            pool: {
                max: 1000,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });

        /**
         * 判断数据库是否正常连接
         */
        this.sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    }

    /**
     * 获取sequelize对象，这个时候获取的应该在启动时初始化完成的对象，并不需要冲洗获取连接池对象
     */
    getSequelize() {
        if(this.sequelize == null) {
            console.log("数据库连接池未初始化，请检查是否配置正确！");
            throw new Error("数据库连接池未初始化，请检查是否配置正确！");
        }
        return this.sequelize;
    }

}

module.exports = new DBHelper();
