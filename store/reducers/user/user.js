import initSate from './initState'
const userReducer = (state = initSate, action) => {
  switch (action.type) {
    case 'LOGOUT': {
      return {}
    }
    default:
      return state
  }
}

export default userReducer
