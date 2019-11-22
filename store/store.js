import { createStore } from 'redux'

const initSate = {
  count: 0
}

function reducer(state = initSate, action) {
  switch (action.type) {
    case 'ADD':
      return { count: state.count + 1 }
    default:
      return state
  }
}

const store = createStore(reducer, initSate)

export default store
