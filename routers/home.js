/**
 * Author: silence
 * Create Time: 2018-09-26 16:04
 * Description:
 */
const router = require('koa-router')()

router.get("/", async (ctx,next) => {
    await ctx.render('index')
});
module.exports = router;