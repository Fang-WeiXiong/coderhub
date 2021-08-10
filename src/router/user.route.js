const Router = require('koa-router')
const {
  create,
  avatorInfo,
  getDetail
} = require('../controller/user.controller');
const { verifyAuth } = require('../middleware/auth.middleware');
const {
  verifyUser, handlepassword
} = require('../middleware/users.middleware')
const userRouter = new Router({
  prefix: '/users'
});



userRouter.post('/', verifyUser, handlepassword, create);
userRouter.get('/:userId/avatar',avatorInfo)
//查询用户所有信息
userRouter.get('/detail',verifyAuth,getDetail)

module.exports = userRouter;