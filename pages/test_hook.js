/**
 * 测试demo
*/
import React, { useState, useReducer, useEffect } from 'react'
import { Button, Input } from 'antd'

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    case 'init':
      return 0
    default:
      return state
  }
}

export default () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Next')
  const [count2, dispatchCount] = useReducer(countReducer, 0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1)
      dispatchCount({ type: 'add' })
    }, 200)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className='hook'>
      <div className='countStyle'>{name}</div>
      <div className='countStyle'>{count}</div>
      <div className='countStyle'>{count2}</div>
      <Button
        onClick={() => {
          setCount(0)
          dispatchCount({ type: 'init' })
        }}
      >
        NIT-COUNT
      </Button>
      <Input
        value={name}
        onChange={e => {
          setName(e.target.value)
        }}
      />
      <style jsx>{`
        .countStyle {
          color: red;
          font-size: 36px;
          padding-left: 24px;
        }
      `}</style>
    </div>
  )
}
