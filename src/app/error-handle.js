const errTypes = require('../constants/error-type')

const errHandler = (error, ctx) => {
    let status, message;
    switch (error.message) {
        case errTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400 //Bad Request
            message = "用户名或者密码为空！"
            break;
        case errTypes.USERNAME_HAS_EXISTS:
            status = 409 //Conflict
            message = "用户名已经存在！"
            break;
        case errTypes.USER_DOES_NOT_EXISTS:
            status = 400 //Conflict
            message = "用户不存在！"
            break;
        case errTypes.PASSWORD_IS_INCORRENT:
            status = 409
            message = "密码不正确！"
            break;
        case errTypes.INAUTHORIZED:
            status = 401
            message = "无效的token!"
            break;
        case errTypes.UNPERMISSION:
            status = 401
            message = "不具备操作的权限!"
            break;
        case errTypes.LABEL_HAS_EXISTS:
            status = 409 //Conflict
            message = "标签已经存在！"
            break;
        default:
            status = 404
            message = "NOT FOUND"
    }


    console.log(error.message);
    ctx.status = status;
    ctx.body = message
}

module.exports = errHandler;