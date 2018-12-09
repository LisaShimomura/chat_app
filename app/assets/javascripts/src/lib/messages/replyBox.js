import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {
// stateの初期値を設定するためにgetInitialStateメソッドを追加
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }
// 変更箇所、開始位置
  get initialState() {
    return this.getStateFromStores()
  }
// 処理を変更したいときでも、あちこち変更する必要がなくなる
  getStateFromStores() {
    return {
      value: '',
      toUserId: MessagesStore.getOpenChatUserId(),
    }
  }
// ReactのComponentが最初にrenderされる時に時に呼び出される。
  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
  }
// 何らかの理由でビューが削除されたらイベントも取り除き、その後エラーが発生しないようにするため
  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
  }
// ビューをストア内の最新データにアップデートするようなリスナ
  onStoreChange() {
    this.setState(this.getStateFromStores())
  }
// イベントのkeyCodeをチェックすることができる
// 送信したいメッセージの値でMessagesActionの中のsendMessageが呼び出される
  handleKeyDown(e) {
    const {value, toUserId} = this.state
    // 13とは送信したあと、入力ボックスの値をクリアする
    if (e.keyCode === 13 && value !== '') {
      MessagesAction.saveMessage(value, toUserId)
      this.setState({
        value: '',
      })
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  uploadImageChat(e) {
    const inputDOM = e.target
    if (!inputDOM.files.length) return
    const file = inputDOM.files[0]
    MessagesAction.saveImageChat(file, this.state.toUserId)
  }
// 終了位置
  render() {
// 割代入と配列展開
    const {value} = this.state

    return (
      <div className='reply-box'>
        <input
          value={value}
          onKeyDown={this.handleKeyDown.bind(this)}
          onChange={this.updateValue.bind(this)}
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <div className='reply-box__image'>
          <input
            className='image-select-btn'
            type='file'
            ref='image'
            onChange={this.uploadImageChat.bind(this)}
          />
        </div>
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
