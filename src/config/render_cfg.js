var render = require("koa-swig");
var co = require("co");

module.exports = co.wrap(
    render({
        root:global.CODE_PATH+"/vm",
        autoescape:true,
        cache:"memory",
        encoding: 'utf8',
        ext:'html'
    })
);