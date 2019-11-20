async function testRedis() {
  const Redis = require('ioredis')

  const redis = new Redis({
    port: 6379,
    host: '127.0.0.1'
  })

  await redis.set('a', 123)
  await redis.setex('a', 10, 123) //10秒过期
  const keys = await redis.keys('*')
  console.log('keys === ', keys)
  console.log('a === ', await redis.get('a'))
}

testRedis()
