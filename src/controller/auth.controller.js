const jwt = require('jsonwebtoken')
const {PRIVATE_KEY} = require('../app/config')
class AuthController {
    async login(ctx, next) {
        const {id, name} = ctx.user;
        const token = jwt.sign({id, name},PRIVATE_KEY,{
            expiresIn:60*60*24,
            algorithm:'RS256'
        });
        let status = 200
        ctx.body = {
            id,name,token,status
        }
    }
    async success(ctx,next){
        ctx.body = "验证成功！ "
    }
}


module.exports = new AuthController();