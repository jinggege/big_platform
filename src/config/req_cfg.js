/**
 * @description  所有的http请求配置，使用im模块时，需要在此添加模块中的配置
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */
module.exports = {
    // im 模块
    im : {
        // hostname : '127.0.0.1',
        hostname : 'www.baidu.com',
        // port : 80,
        // path : '/im/applyRoom?appId=123',// 请求url
        path : '/',
        mehtod : 'GET',
        // headers : {
        //     // 'Content-Type' : 'application/json;charset=utf-8'
        //     'Content-Type' : 'application/x-www-form-urlencoded'
        // } 
    }
}