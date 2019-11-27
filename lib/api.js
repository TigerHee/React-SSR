// 处理服务端请求与客服端请求的差异
const axios = require('axios')
const GITHUB_BASE_URL = 'https://api.github.com'

async function requestGithub(method, url, data, headers) {
  console.log('接口请求URL === ', `${GITHUB_BASE_URL}${url}`)
  return await axios({
    method,
    url: `${GITHUB_BASE_URL}${url}`,
    data,
    headers
  })
}

const isServer = typeof window === 'undefined'

async function request({ method = 'GET', url, data = {} }, req, res) {
  if (!url) {
    throw Error('url must provide')
  }
  if (isServer) {
    console.log('服务端')
    const session = req.session
    const githubAuth = session.githubAuth || {}
    const headers = {}
    if (githubAuth.access_token) {
      headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
    }
    return await requestGithub(method, url, data, headers)
  } else {
    console.log('客户端')
    return await axios({
      method,
      url: `/github${url}`,
      data
    })
  }
}

module.exports = {
  request,
  requestGithub
}
