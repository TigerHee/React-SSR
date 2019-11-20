const Koa = require('koa')
const KoaRouter = require('koa-router')
const Next = require('next') // next作为koa中间件

const dev = process.env.NODE_ENV !== 'production'
const app = Next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new KoaRouter()

  // ctx.res是node的，ctx.response是koa封装过的 req同理
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.response = false
  })

  server.listen(3000, () => {
    console.log('在3000端口启动服务')
  })
})
