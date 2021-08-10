
const app = require('./app/index')
const config = require('./app/config')
require('./app/database')

app.listen(config.APP_PORT,()=>{
	console.log(`服务器启动！ 端口号为${config.APP_PORT}`);
})