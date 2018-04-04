const http = require("http");

/**
 * @description  http请求工具类
 * @author Secret 
 * @version 1.0 
 * @since 1.0 
 */
 class Request {

    constructor(){
    }

    /**
     * get请求
     * @param {*} module 模块名，比如：im模块，直接传入im
     */
    async request(options) {
        // 获取模块配置
        var promise = new Promise( (resolve, rejcet)=> {
            var req = http.request(options, (res)=> {
                if(res.statusCode == 200) {
                    // 设置字符集
                    res.setEncoding("utf-8");
                    // 保存数据
                    var chunks = "";
                    res.on('data', (chunk)=> {
                        chunks += chunk;
                    });
                    // 内容读取完毕
                    res.on('end', ()=> {
                        // 将已经读取到内容返回
                        resolve(chunks);
                    });
                }
            });
            // 判断异常
            req.on("error", (error)=> {
                console.log("获取数据异常: ", error);
                rejcet(error);
            });
            // 写出
            req.write("");
            req.end();
        });
        return promise;
    }

 }

 module.exports = new Request();