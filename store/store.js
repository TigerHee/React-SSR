import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/index'

import commonInitSate from './reducers/common/initState'
import userInitSate from './reducers/user/initState'

export default state => {
  const store = createStore(
    rootReducer,
    Object.assign(
      {},
      {
        common: commonInitSate,
        user: userInitSate
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  )
  return store
}
