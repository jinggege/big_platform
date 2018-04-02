/**
 * 控制器管理 
 * 
 */

var Router    = require('koa-router')
var routeCfg  = require(global.CODE_PATH+'/config/router_cfg.js');
var DBControl = require('./control_db.js');
var DBCfg     = require('../config/db_cfg.js');
var KoaBody   = require('koa-body');

var U = require('./util.js');

const API_DOMAIN = 'http://127.0.0.1:3333/'

class Controller{

    constructor(){
        this.app = null;
    }

    start(app){
        this.app = app;
        this.regControl();
        DBControl.connet( DBCfg );

        this.uploadCfg();
    }

    regControl(){
        var _this   = this;
        var ct      = null;
        var router  = null;
        var methods = null;

        routeCfg.forEach(function(ele) {
            methods = ele.methods;
            ct      = require(global.CODE_PATH+ele.controllerPath).control;
            router  = new Router();
            methods.forEach(function(md){
                router[md.toLowerCase()](ele.router,KoaBody(),ct)
            });
            
            // 加载路由中间件
            _this.app.use(router.routes()).use(router.allowedMethods());
        });

        methods = null;
    }

    uploadCfg(){
        const multer = require('koa-multer');//加载koa-multer模块  
        var storage = multer.diskStorage(
            {  
                destination: function (req, file, cb) {  
                cb(null, 'static/static/upload/')  
            },  
            //修改文件名称  
            filename: function (req, file, cb) {  
            var fileFormat = (file.originalname).split(".");  
                cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
            }  
        })  
        //加载配置  
        var upload = multer({ storage: storage });  
        var router  = new Router();
        router.post('/wl/upload', upload.single('file'), async (ctx, next) => {  
            var url  = API_DOMAIN+"static/upload/" +ctx.req.file.filename;
            var respData = U.formatResp(0,url,'ok');
            ctx.body = respData;
        }) 

        this.app.use(router.routes()).use(router.allowedMethods())
    }



}



module.exports = new Controller();

