const Router = require('koa-router')

const {
    verifyAuth,
    verifyPerimission
} = require('../middleware/auth.middleware')
const {
    create,
    reply,
    update,
    remove,
    list
} = require('../controller/comment.controller')


const commentRouter = new Router({
    prefix: '/comment'
})

commentRouter.post('/', verifyAuth, create)
//增加评论的回复 （动态->评论->回复）
commentRouter.post('/:commentId/reply', verifyAuth, reply)
//修改评论
commentRouter.patch('/:commentId', verifyAuth,verifyPerimission, update)
//删除评论
commentRouter.delete('/:commentId', verifyAuth,verifyPerimission, remove)
//获取评论列表
commentRouter.get('/',list)
module.exports = commentRouter;