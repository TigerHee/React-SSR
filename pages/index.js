import Link from 'next/link'
const api = require('../lib/api')

const Index = () => {
  return (
    <>
      <Link href='/test_page2?id=1'>
        <span>跳转到page2</span>
      </Link>
    </>
  )
}
Index.getInitialProps = async ({ ctx }) => {
  const result = await api.request(
    {
      url: '/search/repositories?q=react'
    },
    ctx.req,
    ctx.res
  )
  return {
    data: result.data
  }
}

export default Index
