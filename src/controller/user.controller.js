const userService = require('../service/use.service')
const fileService = require('../service/file.service')
const fs = require ('fs')

class UserController{
	async create(ctx,next){
		const users = ctx.request.body;
		const res = await userService.create(users);
		ctx.body = res; 
	}
	async avatorInfo(ctx,next){
		//1.用户的头像是哪一个文件
		const {userId} = ctx.params;
		const avatarInfo = await fileService.getAvatorByUserId(userId)
		ctx.response.set('content-type', avatarInfo.mimetype)
		ctx.body =	fs.createReadStream(`./upload/avatar/${avatarInfo[0].filename}`)
	}

	async getDetail(ctx, next){
		console.log(ctx.user.id);
		const res = await userService.getUserDetail(ctx.user.id);
		ctx.body = res; 
	}
} 

module.exports = new UserController();