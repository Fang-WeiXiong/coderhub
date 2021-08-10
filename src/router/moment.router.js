const Router = require('koa-router')

const momentRouter = new Router({
    prefix: '/moment'
})
const {
    create,
    detail,
    list,
    update,
    remove,
    addLabels,
    fileInfo
} = require('../controller/moment.controller')
const {
    verifyAuth,
    verifyPerimission
} = require('../middleware/auth.middleware')
const {
    verifyLabelExists
} = require('../middleware/label.middleware')

momentRouter.post('/', verifyAuth, create)
//查到动态的详细信息
momentRouter.get('/:momentId', detail)
momentRouter.get('/', list)
//1.验证用户登录 2.验证用户是否具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPerimission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPerimission, remove)

//给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPerimission, verifyLabelExists, addLabels)

//给动态配图的服务
momentRouter.get('/images/:filename',fileInfo)
module.exports = momentRouter