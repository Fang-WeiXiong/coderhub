const service = require('../service/label.service')
const errorType = require('../constants/error-type')

class labelControl {
    async create(ctx, next) {
        const {
            name
        } = ctx.request.body;
        try {
            const res = await service.creat(name)
            ctx.body = res
        } catch (err) {
            const error = new Error(errorType.LABEL_HAS_EXISTS)
            ctx.app.emit('error', error, ctx)
        }
    }
    async list(ctx, next) {
        const {
            limit,
            offset
        } = ctx.query;
        const res = await service.getLabels(limit, offset)
        ctx.body = res;
    }
    async remove(ctx, next) {
        
       
    }
}

module.exports = new labelControl()