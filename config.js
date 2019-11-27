// url参考文档： https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
const client_id = '3acdc696c476a6a880d7'
const client_secret = 'f339cc5c59e07a95a5bc1de46dfed8eafd49755b'
const SCOPE = 'user'
const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const REQUEST_TOKEN_URL = 'https://github.com/login/oauth/access_token'

module.exports = {
  client_id,
  client_secret,
  GITHUB_OAUTH_URL,
  REQUEST_TOKEN_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`
}
