import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
// import MessagesAction from '../actions/messages'
import UsersAction from '../actions/users'
// import MessagesStore from '../stores/messages'
import CurrentUserAction from '../actions/currentUser'

export default class MessageRouter extends BaseRouter {
  register() {
    // 一つ目の因数がroot_pathをしている
    this.route('/', this.decorateApp, this.loadUsers, this.loadCurrentUser)
  }

  loadUsers(ctx, next) {
    UsersAction.loadUsers()
    next()
  }

  loadCurrentUser(ctx, next) {
    CurrentUserAction.loadCurrentUser()
    next()
  }
// decorateされている(react_tutorial参照)
  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }
}
