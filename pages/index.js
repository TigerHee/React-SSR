import { Button } from 'antd'
import Link from 'next/link'
import { connect } from 'react-redux'

const Index = props => {
  const { count, change } = props
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
      <Link href='/page2?id=1'>
        <Button>跳转到page2</Button>
      </Link>
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
