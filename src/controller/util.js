"use strict"

var ErrorType = require('../config/error_type.js');

var shortid = require('shortid');
var Base64  = require('js-base64').Base64;

class Utils{

    constructor(){

    }

    /**
     * 格式化返回数据
     * @param {*} code  状态码
     * @param {*} data  数据
     * @param {*} msg   状态描述
     */
    formatResp(code, data,msg){
        var resObj = {
            response:{
                code:code,
                data:data || {},
                msg: msg || ErrorType[code]
            }
        }

        return JSON.stringify(resObj);
    }

    /**
     * 插入数据状态
     * @param {*} data 
     */
    checkInsertStatus(data){
        if(data.serverStatus){
            if(data.serverStatus==3) return true;
        }

        return false;
    }

    /**
     * 创建ID
     * @param {*} data 
     */
    createID(){
        return shortid.generate();
    }

    /**
     * encode   decode
     * @param {*} data 
     */
    Base64(){
        return Base64;
    }

    /**
     * 验证用户的合法性
     * @param {*} data 
     */
    validateUser(session){
        return session.isLogin? true:false;
    }

    /**
     * 创建安全码
     * @param {*} data 
     */
    createSafeCode(){
        var currTimeStr =""+new Date().getTime();
        var strLen    = currTimeStr.length;
        var lastStr   = currTimeStr.substring(strLen-4, strLen);
        return lastStr;
    }










}


module.exports = new Utils();