const fileService = require("../service/file.service");
const momentService = require("../service/moment.service");
const fs = require('fs')
class MomentController {
    async create(ctx, next) {
        //ctx.body = "发表动态成功！"

        //1.获取数据（user_id, content)
        const userId = ctx.user.id;
        const content = ctx.request.body.content;
       // console.log(userId, content);   
        //将数据插入数据库
        const result = await momentService.create(userId, content);
        ctx.body = result;
        
    }

    async detail(ctx, next) {
        //获取id
        const momentId = ctx.params.momentId;
        //根据id查数据
        const result = await momentService.getMomentId(momentId)
        ctx.body = result
    }

    async list(ctx, next) {
        const {
            offset,
            size
        } = ctx.query;
        console.log(ctx.user);
        //查询数据
        const result = await momentService.getMomentList(offset, size)

        ctx.body = result
    }

    async update(ctx, next) {
        //获取moment表的id
        const momentId = ctx.params.momentId;
        const { content } = ctx.request.body;
        const res =await momentService.update( content , momentId )

        ctx.body =res
    }

    async remove(ctx, next) {
        //获取moment表的id
        const momentId = ctx.params.momentId;
        console.log(momentId);
        const res =await momentService.remove( momentId )

        ctx.body =res
    }
    async addLabels(ctx,next){
        //获取标签和动态id
        const {labels} = ctx;
        const {momentId} = ctx.params;
       
        //添加所有的标签
        for( let label of labels){
            //判断标签是否与动态有关系
            const isExist =await momentService.hasLabel(momentId, label.id)
            if(!isExist){
                await momentService.addLabels(momentId, label.id)
            }
        }
        ctx.body = labels;
    }
    //给动态配图
    async fileInfo(ctx,next){
        const {filename} =ctx.params;
        const fileInfo = await fileService.getFileByFilename(filename)
        const type = ctx.query;
        const types = ["small","middle","large"]
        if(types.some(item => item === type)){
            filename = filename +'-'+ type
        }

        ctx.response.set('content-type', fileInfo.mimetype)
        ctx.body = fs.createReadStream(`./upload/picture/${filename}`)
    }
}

module.exports = new MomentController()