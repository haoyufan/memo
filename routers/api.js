/**
 * Author: silence
 * Create Time: 2018-09-26 16:03
 * Description:
 */
const router = require("koa-router")();
const {query} = require('../mysql');

router.post('/', async (ctx, next) => {
  await ctx.jsend({a: 111,})
});

router.post('/getList', async (ctx, next) => {
  const result = await query('SELECT * FROM memo WHERE isDelete=0 LIMIT 0, 20')
  await ctx.jsend(result, '')
});

router.post('/addCard', async (ctx, next) => {
  const body = ctx.body
  await query('INSERT INTO memo(color, y, x) VALUES(?,?,?)', [body.color, body.top, body.left])
  await ctx.jsend(null, '操作成功')
});
module.exports = router;