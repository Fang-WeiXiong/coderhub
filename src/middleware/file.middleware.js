const Multer = require('koa-multer');
const Jimp = require('jimp');
const path = require('path')
const avatarUpload = Multer({
    dest:'./upload/avatar'
})
const avatorHandler = avatarUpload.single('avator')


const pictureUpload = Multer({
    dest:'./upload/picture'
})
const pictureHandler = pictureUpload.array('picture',9)

const pictureResize = async (ctx, next) =>{
    //1.获取所有图像信息
    const files = ctx.req.files;
    //2.对图像进行处理
    for(let file of files){
        const destPath = path.join(file.destination,file.filename)
        console.log(destPath);
        Jimp.read(file.path).then(image => {
            image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
            image.resize(640, Jimp.AUTO).write(`${destPath}-middlw`)
            image.resize(320, Jimp.AUTO).write(`${destPath}-large`)
        })    }

    await next();
}
module.exports = {
    avatorHandler,
    pictureHandler,
    pictureResize
};