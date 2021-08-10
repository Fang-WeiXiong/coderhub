const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const useRoutes = require('../router');
const errHandler = require('./error-handle');
const cors = require('koa-cors');

const app = new Koa();


app.use(bodyParser());
app.use(cors());
useRoutes(app);

app.on('error',errHandler);
module.exports = app;