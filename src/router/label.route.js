const Router = require('koa-router')

const {
    verifyAuth
} = require('../middleware/auth.middleware')
const {
    create,
    list,
    remove
} = require('../controller/label.controller')
const labelRouter = new Router({
    prefix: '/label'
});

labelRouter.post('/', verifyAuth, create)
labelRouter.get('/', list)
labelRouter.delete('/',verifyAuth, remove)

module.exports = labelRouter;