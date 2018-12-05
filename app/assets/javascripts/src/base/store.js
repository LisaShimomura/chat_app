import {EventEmitter2 as EventEmitter} from 'eventemitter2'
// EventEmitterを継承していることでイベントを発するだけでなくコールバック関数の登録や取り消しが可能なオブジェクトを素早く作成できる。
const CHANGE_EVENT = 'change'

class BaseStore extends EventEmitter {
  constructor(opts) {
    super(opts)
    this._storage = null
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  onChange(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  offChange(callback) {
    this.off(CHANGE_EVENT, callback)
  }

  getStorage() {
    if (this._storage) {
      return this._storage
    } else {
      let newObj = {}
      this._storage = newObj
      return newObj
    }
  }

  setStorage(obj) {
    this._storage = obj
  }

  get(key) {
    return this.getStorage()[key]
  }

  set(key, value) {
    this.getStorage()[key] = value
  }

  reset(obj = {}) {
    this.setStorage(obj)
  }
}

export default BaseStore
