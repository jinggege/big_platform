const reqCfg = require("../config/req_cfg.js");
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
     * 获取制定模块配置
     * 
     * @param {*} module 指定模块名
     */
    async getOption(module) {
        var promise = new Promise((resolve) => {
            let option = reqCfg[module];
            if(option == null) {
                console.log("无法获取制定模块配置内容，请检查是否已经在req_cfg.js文件中配置好相应的模块配置！！！");
                resolve(null);
            }
            resolve(option);
        });
       return promise;
    }

    /**
     * get请求
     * @param {*} module 模块名，比如：im模块，直接传入im
     */
    async request(module) {
        // 获取模块配置
        return await this.getOption(module).then( (option)=> {
            var promise = new Promise( (resolve)=> {
                var req = http.request(option, (res)=> {
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
                    console.log("获取数据异常，", error);
                });
                // 写出
                req.write("");
                req.end();
            });
           return promise;
        });
        // 
    }

 }

 module.exports = new Request();