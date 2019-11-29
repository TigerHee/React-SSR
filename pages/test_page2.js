/**
 * 测试demo
*/
import { Button } from 'antd'
import Router, { withRouter } from 'next/router'
import styled from 'styled-components'
// import moment from 'moment'

const Title = styled.h1`
  color: blue;
  font-size: 36px;
`

const Page2 = ({ router, name, time }) => {
  function pageToIndex() {
    Router.push('/test_hook')
  }

  return (
    <>
      <Title>this is title</Title>
      <Button onClick={pageToIndex}>query: {JSON.stringify(router.query)}</Button>
      <div>
        {name} {time}
      </div>
      <style jsx>{`
        div {
          color: red;
        }
      `}</style>
    </>
  )
}

Page2.getInitialProps = async ctx => {
  const moment = await import('moment')
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'PAGE2',
        time: moment.default(Date.now() - 60 * 1000).fromNow()
      })
    }, 1000)
  })
  return await promise
}

export default withRouter(Page2)
