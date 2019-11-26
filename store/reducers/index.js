import { combineReducers } from 'redux'
import common from './common/common'
import user from './user/user'

export default combineReducers({
  common,
  user
})
