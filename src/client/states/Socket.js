import socket from 'socket.io-client'

export default class {
  constructor (game, url) {
    this.game = game
    console.log('I do get in here')
    this.socket = socket(url)
    this.socket.on('connect', this.onConnect)
    this.socket.on('disconnect', this.onDisconnect)
  }

  onConnect () {
    console.log('connected!')
  }

  onDisconnect () {
    console.log('disconnected :(')
  }

}
