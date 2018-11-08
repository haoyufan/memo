/**
 * Author: silence
 * Create Time: 2018-09-26 16:03
 * Description:
 */
const router = require("koa-router")();
const {query} = require('../mysql');

router.post('/getList', async (ctx, next) => {
  const result = await query('SELECT * FROM memo WHERE isDelete=0 LIMIT 0, 20')
  await ctx.jsend(result, '')
});

router.post('/addCard', async (ctx, next) => {
  const body = ctx.body
  await query('INSERT INTO memo(color, y, x) VALUES(?,?,?)', [body.color, body.y, body.x]);
  await ctx.jsend(null, '操作成功')
});

router.post('/setCard', async (ctx, next) => {
  const body = ctx.body;
  console.log(ctx.cookies.get('JSESSIONID'))
  await query('UPDATE memo SET title=?, content=?,y=?,x=? WHERE id=?', [body.title, body.content, body.y, body.x, body.id]);
  await ctx.jsend(null, '修改成功')
})

router.post('/delCard', async ctx => {
  const body = ctx.body;
  await query('UPDATE memo set isDelete=1 WHERE id=?', [body.id])
  await ctx.jsend(null, '删除成功')
})
module.exports = router;