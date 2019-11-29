/**
 * 测试demo
*/
import { useEffect } from 'react'
import { Button } from 'antd'
import Link from 'next/link'
import { connect } from 'react-redux'
import getConfig from 'next/config'
import axios from 'axios'

const { publicRuntimeConfig } = getConfig()

const Index = props => {
  const { count, change } = props

  useEffect(() => {
    axios.get('/api/user/info').then(res => console.log('index axios res === ', res))
  }, [])

  return (
    <div>
      <div>count: {count}</div>
      <Button
        onClick={() => {
          change(+new Date())
        }}
      >
        add count
      </Button>
      <br />
      <br />
      <br />
      <Link href='/test_page2?id=1'>
        <Button>跳转到page2</Button>
      </Link>
      <br />
      <br />
      <br />
      <a href={publicRuntimeConfig.OAUTH_URL}>去授权</a>
    </div>
  )
}
const mapStateToProps = state => ({
  count: state.common.count
})
const mapDispatchToProps = dispatch => ({
  change: val => dispatch({ type: 'UPDATE_STATE', payload: { count: val } })
})
export default connect(mapStateToProps, mapDispatchToProps)(Index)
