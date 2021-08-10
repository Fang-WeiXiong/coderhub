const jwt = require('jsonwebtoken')
const errType = require('../constants/error-type')
const userService = require('../service/use.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle')
const {
    PUBLIC_KEY
} = require('../app/config')

//校验密码
const verifyLogin = async (ctx, next) => {
    const {
        name,
        password
    } = ctx.request.body;

    //判断是否为空
    if (!name || !password) {
        const error = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }

    //判断用户是否存在
    const result = await userService.getUserByName(name);
    const user = result[0];
    if (!user) {
        const error = new Error(errType.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }

    //判断密码正确
    if (md5password(password) !== user.password) {
        const error = new Error(errType.PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error', error, ctx)
    }

    ctx.user = user;
    await next();
}

//校验token
const verifyAuth = async (ctx, next) => {
    console.log("验证授权middleware");
    //获取token
    const authorization = ctx.headers.authorization;
    if (!authorization) {
        const error = new Error(errType.INAUTHORIZED)
        return ctx.app.emit('error', error, ctx)
    }
    const token = authorization.replace('Bearer ', '');
    //验证token
    try {
        //解析获取用户的信息(id/name/iat/exp)
        const res = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        });
        ctx.user = res;
        await next();
    } catch (err) {

        const error = new Error(errType.INAUTHORIZED)
        ctx.app.emit('error', error, ctx)
    }
}

//校验是否具有权限
const verifyPerimission = async (ctx, next) => {
    console.log("验证权限的middleware");

    //获取各个表的名字，id
    const [resourceKey] = Object.keys(ctx.params)
    const tableName = resourceKey.replace('Id','')
    const resourceId = ctx.params[resourceKey] 
    const { id } = ctx.user;
   
    //查询是否具备权限
    try{
        const isPermission = await authService.checkResource(tableName, resourceId, id)
        if(!isPermission) throw new Error()
    }catch(err){
        const error = new Error(errType.UNPERMISSION)
        return ctx.app.emit('error', error, ctx)
    }
    await next();
}



module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPerimission
}