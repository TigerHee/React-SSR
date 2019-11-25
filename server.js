const Koa = require('koa')
const KoaRouter = require('koa-router')
const Next = require('next') // next作为koa中间件
const session = require('koa-session')

const dev = process.env.NODE_ENV !== 'production'
const app = Next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new KoaRouter()

  server.keys = ['tiger dev Github App']
  const SESSION_CONFIG = {
    key: 'jid'
    // store: {}
  }
  server.use(session(SESSION_CONFIG, server))

  server.use(async (ctx, next) => {
    // console.log(ctx.cookies.get('id'))
    if (!ctx.session.user) {
      // ctx.session.user = {
      //   name: 'tiger',
      //   age: 25
      // }
    } else {
      console.log('ctx.session === ', ctx.session)
    }
    await next()
  })

  router.get('/page2/:id', async ctx => {
    const id = ctx.params.id
    console.log('id === ', id)
    await handle(ctx.req, ctx.res, {
      pathname: '/page2',
      query: { id }
    })
    ctx.response = false
  })

  router.get('/set/user', async ctx => {
    ctx.session.user = {
      name: 'tiger',
      age: 25
    }
    ctx.body = 'set session success'
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
