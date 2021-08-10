const fileService = require('../service/file.service')
const userService = require('../service/use.service')
const {APP_HOST} = require('../app/config')
class FileController {
    //保存图像到数据库 
    async saveAvatorInfo(ctx, next) {
        //1.获取相关信息
        const {
            mimetype,
            filename,
            size
        } = ctx.req.file;
        const { id } = ctx.user;
        //2.讲图像信息数据保存到数据库中
        const res = await fileService.createAvatar(filename, mimetype, size, id)
        //3.将图片地址返回到user表中
        const avatarUrl = `${APP_HOST}/users/${id}/avatar`;
        console.log(avatarUrl);
        await userService.updatedAvatarUrlById(avatarUrl, id);
        ctx.body = {
            statusCode: 1110,
            message: "头像上传成功！"  
        }

    }
    //保存动态图像信息
    async savePictureInfo(ctx, next){
        const files = ctx.req.files;
        const { id } = ctx.user;
        const { momentId} = ctx.query;

        //将所有文件信息保存到数据库中
        for (let file of files){
            const { filename, mimetype, size } = file;
            const res = await fileService.createPicture(filename, mimetype, size, id, momentId)

        }
        ctx.body = "动态配图上传完成！"
    }
}

module.exports = new FileController();