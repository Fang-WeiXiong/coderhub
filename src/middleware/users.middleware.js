const errType = require('../constants/error-type')
const service = require('../service/use.service')
const md5password = require('../utils/password-handle')
const verifyUser = async (ctx, next) => {
    const {
        name,
        password
    } = ctx.request.body;
    //判断不为空
    if (!name || !password) {
        const error = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    //判断是否存在用户名
    const result = await service.getUserByName(name);
    
    if (result.length) {
        const error = new Error(errType.USERNAME_HAS_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }

    await next();
}

const handlepassword = async (ctx, next) => {
    const {password} = ctx.request.body;
    ctx.request.body.password = md5password(password);
    await next();
}



    module.exports = {
        verifyUser,
        handlepassword,

    }