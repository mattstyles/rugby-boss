
import {safe, compress} from 'raid-addons'
import actions from './actions'

export const debug = safe((state, event) => {
  console.log(event, '::', state)
})

export const test = compress(actions.anAction)(safe((state, payload) => {
  return {
    ...state,
    message: payload || state.message
  }
}))
