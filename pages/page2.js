import { Button } from 'antd'
import Router, { withRouter } from 'next/router'

const Page2 = ({ router, name }) => {
  function pageToIndex() {
    Router.push('/')
  }
  // console.log('router === ', router)
  return (
    <div>
      <Button onClick={pageToIndex}>
        query: {JSON.stringify(router.query)}
      </Button>
      <div>name：{name}</div>
    </div>
  )
}

Page2.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'PAGE2'
      })
    }, 1000)
  })
  return await promise
}

export default withRouter(Page2)
