/* globals __DEV__ */
import Phaser from 'phaser'
import Ship from '../sprites/Ship'
import Asteroid from '../sprites/Asteroid'
// import {setResponsiveWidth} from '../utils'
// import Socket from './Socket'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.remotePlayers = []
    // this.game.socket = new Socket({
    //  game: this.game,
    //  url: 'http://localhost'
    // })

    this.game.key_left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.game.key_right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.game.key_thrust = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.game.key_fire = this.game.input.keyboard.addKey(Phaser.Keyboard.F)
    this.game.reset = this.game.input.keyboard.addKey(Phaser.Keyboard.R)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.ship = new Ship({
      game: this.game,
      x: this.game.width / 2,
      y: this.game.width / 2,
      physics: Phaser.Physics.ARCADE,
      asset: 'ship'
    })
    // setResponsiveWidth(this.ship, 10, this.game.world)
    this.game.add.existing(this.ship)

    this.game.asteroids = Array.from(
      new Array(5), (x, i) => new Asteroid({
        game: this.game,
        x: Math.floor((Math.random() * this.game.world.width)),
        y: Math.floor((Math.random() * this.game.world.height)),
        asset: 'asteroid',
        physics: Phaser.Physics.ARCADE
      }))

    this.game.asteroids.forEach(asteroid => this.game.add.existing(asteroid))
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.ship, 32, 32)
    }
  }

  update () {
  }
}
