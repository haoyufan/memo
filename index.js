const Koa = require("koa")
const http = require("http")
const path = require('path')
const views = require("koa-views")
const logger = require("koa-logger")
const statics = require('koa-static')
<<<<<<< HEAD
const convert = require('koa-convert');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser')();
const koaBody = require('koa-body');
const cors = require('koa-cors');
=======
>>>>>>> 8ef41b70c7b1e8f47e8c6a328663dcb0240f6e21

const router = require("./routers")
const app = new Koa()
const port = 4050

<<<<<<< HEAD
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

=======
let server = http.createServer(app.callback())

app.use(logger())

console.log()
app.use(statics(path.join( __dirname,  '/')))
app.use(views(__dirname + '/',{extension: 'html'}))

app.use(router.routes(), router.allowedMethods())
>>>>>>> 8ef41b70c7b1e8f47e8c6a328663dcb0240f6e21
app.on("error", (err, ctx) => {
	log.error('server error', err, ctx)
})

server.listen(port, () =>{
    console.log(`http://localhost:${port}`)
})
