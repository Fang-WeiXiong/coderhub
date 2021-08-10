const Router = require('koa-router')
const {avatorHandler, pictureHandler, pictureResize} = require('../middleware/file.middleware')
const { verifyAuth } = require('../middleware/auth.middleware');
const { saveAvatorInfo,savePictureInfo } = require('../controller/flie.controller');
const fileRouter = new Router({prefix:'/upload'});

fileRouter.post('/avatar', verifyAuth,avatorHandler, saveAvatorInfo )
fileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize,savePictureInfo)

module.exports = fileRouter;