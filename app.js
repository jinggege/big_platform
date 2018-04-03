'use strict'
/**
 * 拓维 静态服务器
 */
global.CODE_PATH = __dirname+"/src";

global.UPLOAD_PATH = __dirname+'/static/static/upload';

var Koa = require("koa");

var Path = require("path");

var cors = require('koa-cors');

const convert = require('koa-convert');  

const bodyparser = require('koa-bodyparser')();  

var Ctr = require(global.CODE_PATH + '/controller/controller.js');




var app = new Koa();

//============set session options =================
const session  = require('koa-session');
var SessionCfg = require('./src/config/session_cfg.js');
app.keys = ['==wl=='];
app.use(session(SessionCfg, app));
//==================================================





const SERVER_PORT = 3334;

app.use( cors() );

//app.use(convert(bodyparser));  

Ctr.start(app);


app.listen( SERVER_PORT );

console.log("====appcloud static server start by "+SERVER_PORT+" ====");


