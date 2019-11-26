const Koa = require('koa')
const KoaRouter = require('koa-router')
const Next = require('next') // next作为koa中间件
const session = require('koa-session')
const Redis = require('ioredis')
const auth = require('./server/auth')

const dev = process.env.NODE_ENV !== 'production'
const app = Next({ dev })
const handle = app.getRequestHandler()
const RedisSessionStore = require('./server/session-store')

// 创建redis client
const redis = new Redis()

app.prepare().then(() => {
  const server = new Koa()
  const router = new KoaRouter()

  server.keys = ['tigerHee Github App']
  const SESSION_CONFIG = {
    key: 'jid',
    store: new RedisSessionStore(redis)
  }
  server.use(session(SESSION_CONFIG, server))

  // 处理github授权登录
  auth(server)

  server.use(async (ctx, next) => {
    console.log('==============================')
    console.log('ctx.session === ', ctx.session)
    await next()
  })

  // 处理page2路由
  router.get('/page2/:id', async ctx => {
    const id = ctx.params.id
    console.log('id === ', id)
    await handle(ctx.req, ctx.res, {
      pathname: '/page2',
      query: { id }
    })
    ctx.response = false
  })

  // 设置用户
  router.get('/api/user/info', async ctx => {
    const user = ctx.session.userInfo
    if (user) {
      ctx.body = ctx.session.userInfo
      ctx.set('Content-Type', 'application/json')
    } else {
      ctx.status = 401
      ctx.body = '未登录'
    }
  })

  server.use(router.routes())

  // ctx.res是node的，ctx.response是koa封装过的 req同理
  server.use(async (ctx, next) => {
    ctx.cookies.set('id', 'xxxxxx')
    await handle(ctx.req, ctx.res)
    ctx.response = false
  })

  server.listen(3000, () => {
    console.log('在3000端口启动服务')
  })
})
