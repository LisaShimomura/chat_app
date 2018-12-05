import 'babel-polyfill'
import $ from './vendor/jquery'
import page from 'page'
import MessageRouter from './router/message'
import UserRouter from './router/user'

$(() => {
  const messageRouter = new MessageRouter()
  messageRouter.register()
  const userRouter = new UserRouter()
  userRouter.register()

  page({click: false})
})
// ファイル内でregister()されたRouterに関連するファイルの読み込みがされる
// したがって、開発中の変更が自動的に反映され、エラーも判明する、という仕組み
