let util = require('util')

let Player = require('./player')

module.exports = class Game {
  constructor (socket, width, height) {
    this.socket = socket
    this.players = []
    socket.sockets.on('connection', this.onSocketConnection)

    this.world = {width: width, height: height}
  }

  onSocketConnection (client) {
    util.log('New player has connected: ' + client.id)

    // Listen for client disconnected
    client.on('disconnect', this.onClientDisconnect)

    // Listen for new player message
    client.on('new player', this.onNewPlayer)

    // Listen for move player message
    client.on('move player', this.onMovePlayer)
  }

  onClientDisconnect () {
    util.log('Player has disconnected: ' + this.id)

    let removePlayer = this.playerById(this.id)

    // Player not found
    if (!removePlayer) {
      util.log('Player not found: ' + this.id)
      return
    }

    // Remove player from players array
    this.players.splice(this.players.indexOf(removePlayer), 1)

    // Broadcast removed player to connected socket clients
    this.broadcast.emit('remove player', {id: this.id})
  }

  onNewPlayer (data) {
    // Create a new player
    var newPlayer = new Player(data.x, data.y)
    newPlayer.id = this.id

    // Broadcast new player to connected socket clients
    this.broadcast.emit('new player', {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()})

    // Send existing players to the new player
    let i, existingPlayer
    for (i = 0; i < this.players.length; i++) {
      existingPlayer = this.players[i]
      this.emit('new player', {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()})
    }

    // Add new player to the players array
    this.players.push(newPlayer)
  }

  onMovePlayer (data) {
    // Find player in array
    let movePlayer = this.playerById(this.id)

    // Player not found
    if (!movePlayer) {
      util.log('Player not found: ' + this.id)
      return
    }

    // Update player position
    movePlayer.setX(data.x)
    movePlayer.setY(data.y)

    // Broadcast updated position to connected socket clients
    this.broadcast.emit('move player', {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()})
  }

  playerById (id) {
    let i
    for (i = 0; i < this.players.length; i++) {
      if (this.players[i].id === id) {
        return this.players[i]
      }
    }

    return false
  }
}
