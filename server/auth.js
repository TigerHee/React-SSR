/**
 * 授权登录，退出登录相关处理
*/
const axios = require('axios')

const config = require('../config')
const { REQUEST_TOKEN_URL, OAUTH_URL, client_id, client_secret } = config

module.exports = server => {
  // 处理code
  server.use(async (ctx, next) => {
    if (ctx.path === '/auth') {
      const code = ctx.query.code
      if (!code) {
        ctx.body = 'code not exist'
        return
      }
      const result = await axios({
        method: 'POST',
        url: REQUEST_TOKEN_URL,
        data: {
          client_id,
          client_secret,
          code
        },
        headers: {
          Accept: 'application/json'
        }
      })

      console.log(result.status, result.data)

      if (result.status === 200 && result.data && !result.data.error) {
        ctx.session.githubAuth = result.data

        const { access_token, token_type } = result.data

        const userInfoResp = await axios({
          method: 'GET',
          url: 'https://api.github.com/user',
          headers: {
            Authorization: `${token_type} ${access_token}`
          }
        })

        // console.log(userInfoResp.data)
        //设置用户信息
        ctx.session.userInfo = userInfoResp.data

        ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/')
        ctx.session.urlBeforeOAuth = ''
      } else {
        const errorMsg = result.data && result.data.error
        ctx.body = `request token failed ${errorMsg}`
      }
    } else {
      await next()
    }
  })

  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method
    if (path === '/logout' && method === 'POST') {
      ctx.session = null
      ctx.body = `logout success`
    } else {
      await next()
    }
  })

  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method
    if (path === '/prepare-auth' && method === 'GET') {
      const { url } = ctx.query
      ctx.session.urlBeforeOAuth = url
      // ctx.body = 'ok'
      ctx.redirect(OAUTH_URL)
    } else {
      await next()
    }
  })
}
