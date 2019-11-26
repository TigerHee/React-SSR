import axios from 'axios'
// 设置公共数据
export const update_state = payload => ({
  type: 'UPDATE_STATE',
  payload
})
export function logout() {
  return dispatch => {
    axios
      .post('/logout')
      .then(resp => {
        if (resp.status === 200) {
          dispatch({
            type: 'LOGOUT'
          })
        } else {
          console.log('logout failed', resp)
        }
      })
      .catch(err => {
        console.log('logout failed', err)
      })
  }
}
