const router = require("koa-router")()

<<<<<<< HEAD
const home = require('./home')
const api = require('./api')

router.use('/', home.routes(), home.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())
=======
router.get("/", async (ctx,next) => {
	await ctx.render("index")
})














>>>>>>> 8ef41b70c7b1e8f47e8c6a328663dcb0240f6e21

module.exports = router
