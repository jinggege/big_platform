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
     * @param {*} options 配置信息
     */
    async request(options) {
        // 获取模块配置
        var promise = new Promise( (resolve, reject)=> {
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
                reject(error);
            });
            // 判断超时
            req.setTimeout(5000, () => {
                console.log("请求超时...");
                reject("请求超时...");
            });
            // 写出
            req.write("");
            req.end();
        });
        return promise;
    }

 }

 module.exports = new Request();