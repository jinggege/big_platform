module.exports = [
    /*
    {
        name:"wl",
        router:"/wl",
        controllerPath:"/controller/h5_front/index.js",
        methods:["GET","POST"],
        desc:'首页'
    },
    {
        name:"course",
        router:"/wl/course/detail/:courseId",
        controllerPath:"/controller/h5_front/index_course.js",
        methods:["GET","POST"],
        desc:'课程详细'
    },
    {
        name:"enroll",
        router:"/wl/enroll/:type",
        controllerPath:"/controller/enroll.js",
        methods:["GET","POST"],
        desc:'报名'
    },
    {
        name:"login/reg",
        router:"/wl/account/:type",
        controllerPath:"/controller/user/user_login.js",
        methods:["GET","POST"],
        desc:'登录/注册/个人信息/账号'
    },
    {
        name:"user",
        router:"/wl/user/:type",
        controllerPath:"/controller/user/user.js",
        methods:["GET","POST"],
        desc:'个人信息/账号'
    },
    {
        name:"admin course cmd",
        router:"/wl/admin/course/cmd/:cmd",
        controllerPath:"/controller/admin/course_opreate.js",
        methods:["GET","POST"],
        desc:'课程操作'
    },
    {
        name:"admin html ",
        router:"/wl/admin/page/:type",
        controllerPath:"/controller/admin/course_html.js",
        methods:["GET","POST"],
        desc:'后台页面'
    },
    {
        name:"admin html ",
        router:"/wl/admin/login",
        controllerPath:"/controller/admin/login.js",
        methods:["GET","POST"],
        desc:'后台登录'
    },
    {
        name:" api ",
        router:"/wl/api/:type",
        controllerPath:"/controller/api.js",
        methods:["GET","POST"],
        desc:' 接口 '
    },

    */

   {
        name:" add store apply",
        router:"/admin/store/add/apply",
        controllerPath:"/controller/store/store_apply.js",
        methods:["GET"],
        desc:' 商铺申请信息 '
    },
    {
        name:" add store apply",
        router:"/admin/store/add/doApply",
        controllerPath:"/controller/store/store_doapply.js",
        methods:["POST"],
        desc:' 处理商铺申请 '
    },
    {
        name:" query all store appid",
        router:"/admin/store/query/appIdList",
        controllerPath:"/controller/store/store_list.js",
        methods:["GET"],
        desc:' 获取所有的商铺信息（appid） '
    }
   
];

