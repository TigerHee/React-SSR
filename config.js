// url参考文档： https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
module.exports = {
  github: {
    client_id: '3acdc696c476a6a880d7',
    client_secret: 'f339cc5c59e07a95a5bc1de46dfed8eafd49755b',
    scope: 'user',
    github_oauth_url: 'https://github.com/login/oauth/authorize',
    request_token_url: 'https://github.com/login/oauth/access_token'
  }
}
