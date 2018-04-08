/**
 * @description  数据库链接总配置文件，根据不同的模块名来区分
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */
module.exports = {
    // admin模块
    platform : {
        mysql : {
            dialect: 'mysql',
            host:'127.0.0.1',
            port:3306,
            database:'big_platform',
            user:'root',
            password:'root'
        }, 
        redis : {

        }
    }
}