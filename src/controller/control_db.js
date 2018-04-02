"use strict"

var DbClient = require("mysql-pro");

class DBCtrol{

    constructor(){
        this.dbConfig = null;
        this.db = null;

    }

    connet(dbConfig){
        this.dbConfig = dbConfig;

        this.db = new DbClient(
            {
                mysql:dbConfig
            }
        );
    }


     /**获取用户信息 */
     async getUserInfo(uid){
        await this.db.startTransaction();
        var resule = await this.db.executeTransaction( "select * from wl_user where uid=?;", [ String(uid) ]);
        await this.db.stopTransaction();
        return resule[0];
    }

    async addUser(uname, phone,level, time, timeFlag){
        await this.db.startTransaction();
        var resule = await this.db.executeTransaction( "insert into enroll_user set uname = ?, phone= ?, level=?, time=?, time_flag=?; " ,[uname,phone,level,time,timeFlag]);
        await this.db.stopTransaction();
        return resule;
    }

    async allUser(flag){
        await this.db.startTransaction();
        var result = {};

        if(flag==0){
            result = await this.db.executeTransaction( "select * from enroll_user");
        }else{
            result = await this.db.executeTransaction( "select * from enroll_user where time_flag=?;", [flag]);
        }
        await this.db.stopTransaction();
        return result;
    }   

    /** 登录 */
    async login(loginInfo){
        await this.db.startTransaction();
        var result = await this.db.executeTransaction( "select * from wl_user where phone=? and pwd=?;" ,[loginInfo.phone, loginInfo.pwd]);
        await this.db.stopTransaction();
        return result;
    }

    /** 注册 */
    //todo 处理重复注册
    async reg(regInfo){
        await this.db.startTransaction();
        var resule = await this.db.executeTransaction( 
            "insert into wl_user set phone=?, uid=?, pwd=?, reg_time=?;" ,
            [regInfo.phone, regInfo.uid, regInfo.pwd, regInfo.regTime]
        );
        await this.db.stopTransaction();
        return resule;
    }

    /** 创建课程 */
    async addCourse(info){
        await this.db.startTransaction();
        var resule = await this.db.executeTransaction( 
            "insert into wl_course set course_id=?,uid=?, author_id=?, title=?, price=?, introduce=?, cover=?, show=?;" ,
            [info.course_id, info.uid, info.author_id, info.title, Number(info.price), info.desc, info.cover, info.show ]
        );
        await this.db.stopTransaction();
        return resule;
    }

    /**获取作者课程列表 */
    async getAuthorCourse(uid){
        await this.db.startTransaction();
        var resule = await this.db.executeTransaction( "select * from wl_course where author_id=?;", [ String(uid) ]);
        await this.db.stopTransaction();
        return resule;
    }

    /**获取用户已购买课程列表 */
    async getUserOwnCourse(uid){
        await this.db.startTransaction();
        var courseIdList = await this.db.executeTransaction( "select * from wl_course_user where buy_id=?;", [ String(uid) ]);
        var courseList = [];
        var item = null;
        var courseItem = null;
        for(var i=0; i<courseIdList.length; i++){
            item = courseIdList[i];
            
            courseItem = await this.db.executeTransaction( "select * from wl_course where course_id=?;", [ item.course_id ]);
            courseList.push( courseItem[0] );
        }
        await this.db.stopTransaction();
        return courseList;
    }

    /**获取课程信息 */
    async getCourseInfo(courseId){
        await this.db.startTransaction();
        var resule = await this.db.executeTransaction( "select * from wl_course where course_id=?;", [ String(courseId) ]);
        await this.db.stopTransaction();
        return resule;
    }

    /**更新课程 */
    async updateCourse(info){
        await this.db.startTransaction();
        var result = {};

        result = await this.db.executeTransaction( 
            "update wl_course set title=?, introduce=?, price=?, cover=?, online=? where course_id=?;",     
            [ info.title, info.introduce, info.price, info.cover, Number(info.online), String(info.course_id) ]     
        );
       
        await this.db.stopTransaction();
        return result;
    }

    /** 添加章节 */
    async addCapter(info){
        await this.db.startTransaction();
        var resule = await this.db.executeTransaction( 
            "insert into wl_capter set course_id=?,capter_id=?, uid=?, title=?,introduce=?, cover=?, video=?;" ,
            [info.course_id, info.capter_id, info.uid, info.title, info.introduce, info.cover, info.video  ]
        );
        await this.db.stopTransaction();
        return resule;
    }

    /**获取课程章节列表 */
    async getCourseCapter(courseId){
        await this.db.startTransaction();
        var resule = await this.db.executeTransaction( "select * from wl_capter where course_id=?;", [ String(courseId) ]);
        await this.db.stopTransaction();
        return resule;
    }

    /**更新课程章节 */
    async updateCourseCapter(info){
        await this.db.startTransaction();
        var result = await this.db.executeTransaction( "update wl_capter set title=?  where capter_id=?;",     [ info.title, String(info.capter_id) ]     );
        result = await this.db.executeTransaction( "update wl_capter set introduce=?  where capter_id=?;", [ info.introduce, String(info.capter_id) ] );
        result = await this.db.executeTransaction( "update wl_capter set cover=?  where capter_id=?;",     [ info.cover, String(info.capter_id) ]     );
        result = await this.db.executeTransaction( "update wl_capter set video=?  where capter_id=?;",     [ info.video, String(info.capter_id) ]     );
        await this.db.stopTransaction();
        return result;
    }

    /**删除课程章节 */
    async delCourseCapter(capterId){
        await this.db.startTransaction();
        var result = await this.db.executeTransaction( "delete * from wl_capter where capter_id=?;", [ String(capterId) ]);
        await this.db.stopTransaction();
        return result;
    }

    /** 添加章节 */
    async buyCourse(uid, course_id, author_id){
        await this.db.startTransaction();
        var resule = await this.db.executeTransaction( 
            "insert into wl_course_user set course_id=?,buy_id=?, author_id=?;" ,
            [course_id, uid, author_id  ]
        );
        await this.db.stopTransaction();
        return resule;
    }

    /**获取推荐课程列表 */
    async getRemommendCourse(){
        await this.db.startTransaction();
        var recommendList = await this.db.executeTransaction( "select * from wl_course_recommend;", [ ] );
        var item       = null;
        var courseItem = null;
        var courseList = [];
        for(var i=0; i<recommendList.length; i++){
            item = recommendList[i];
            courseItem = await this.db.executeTransaction( "select * from wl_course where course_id=?;", [ item.course_id ] );
            courseList.push( courseItem );
        }
        await this.db.stopTransaction();
        return courseList;
    }



}

module.exports = new DBCtrol();
