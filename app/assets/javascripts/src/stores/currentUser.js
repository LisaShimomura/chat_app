import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class CurrentUserStore extends BaseStore {
  getCurrentUser() {
    if (!this.get('currentUser')) this.setCurrentUser({})
    return this.get('currentUser')
  }

  setCurrentUser(obj) {
    this.set('currentUser', obj)
  }
}
// current_userのデータをreactで使用する
const CurrentUser = new CurrentUserStore()

CurrentUser.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
// type値と一致したらあればそれに紐付いた関数を呼び出す
  switch (action.type) {
    case ActionTypes.LOAD_CURRENT_USER:
      CurrentUser.setCurrentUser(payload.action.json)
      CurrentUser.emitChange()
      // emitChangeメソッドはBaseStoreにある。
      break
  }

  return true
})

window.CurrentUser = CurrentUser
export default CurrentUser
