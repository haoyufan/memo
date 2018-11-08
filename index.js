const Koa = require("koa")
const http = require("http")
const path = require('path')
const views = require("koa-views")
const logger = require("koa-logger")
const statics = require('koa-static')
const convert = require('koa-convert');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser')();
const koaBody = require('koa-body');
const cors = require('koa-cors');
const router = require("./routers")
const app = new Koa()
const port = 4050

const server = http.createServer(app.callback())

app.use(convert.compose(
    koaBody({ multipart: true }),
    bodyParser,
    json(),
    logger(),
    cors(),
))


app.use(async function(ctx, next) {
    ctx.json = function (data) {
        this.body = data;
    };
    ctx.jsend = function (data = null, msg = null, ...attach) {
        this.json({code: 1000, data: data, msg: msg, ...attach})
    };
    if(typeof ctx.request.body === 'string'){
      ctx.body = JSON.parse(ctx.request.body);
    }
    await next()
})

app.use(views(__dirname + '/',{extension: 'html'}))
app.use(router.routes()).use(router.allowedMethods())
app.use(statics(path.join( __dirname,  '/')))
app.use(logger())

app.on("error", (err, ctx) => {
	log.error('server error', err, ctx)
})

server.listen(port, () =>{
    console.log(`http://localhost:${port}`)
})
