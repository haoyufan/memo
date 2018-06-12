const Koa = require("koa")
const http = require("http")
const path = require('path')
const views = require("koa-views")
const logger = require("koa-logger")
const statics = require('koa-static')

const router = require("./routers")
const app = new Koa()
const port = 4050

let server = http.createServer(app.callback())

app.use(logger())

console.log()
app.use(statics(path.join( __dirname,  '/')))
app.use(views(__dirname + '/',{extension: 'html'}))

app.use(router.routes(), router.allowedMethods())
app.on("error", (err, ctx) => {
	log.error('server error', err, ctx)
})

server.listen(port, () =>{
    console.log(`http://localhost:${port}`)
})
