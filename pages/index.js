import { Button } from 'antd'
import Link from 'next/link'

export default () => {
  
  return (
    <div>
      <Button>botton</Button>
      <Link>
        <Button href='/page2?id=1'>跳转到page2</Button>
      </Link>
    </div>
  )
}
