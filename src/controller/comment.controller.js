const service = require('../service/cmoment.service')
class commentController{
    async create(ctx, next){
        
        const { momentId, content } = ctx.request.body;
        const {id} =ctx.user;
        const res = await service.create(momentId, content ,id)
        ctx.body = res
    }
    async reply(ctx,next){
        const { momentId, content } = ctx.request.body;
        const { commentId } = ctx.params;
        const { id } =ctx.user;
        const res = await service.reply(momentId, content , id , commentId)
        ctx.response.body = res
    }
    async update(ctx,next){
        const { content } = ctx.request.body;
        const { commentId } = ctx.params;
        const res = await service.update(content , commentId)  
        ctx.body = res
    }
    async remove(ctx,next){
        const { commentId } = ctx.params;
       
        const res = await service.remove(commentId)  
        ctx.body = res
    }
    async list(ctx, next){
        const { momentId } = ctx.query;
        
        const res = await service.getCommentsByMomentId(momentId)
        ctx.body = res[0]
    }
}
module.exports = new commentController()