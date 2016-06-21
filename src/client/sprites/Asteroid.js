import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset, physics, type }) {
    super(game, x, y, asset)

    this.game = game
    this.anchor.setTo(0.5)
    this.rotation += Math.floor(Math.random() * 20) + 3
    this.game.physics.arcade.enable(this)

    this.body.velocity.set(Math.floor(Math.random() * 20) + 20)
    this.game.physics.arcade.velocityFromRotation(this.rotation, 20, this.body.velocity)
    this.body.maxVelocity = 25
    
    this.type = type;
  }

  update () {
    this.rotation += 0.01
    this.game.world.wrap(this, 16)
  }

  destroy () {
    super.destroy()
  }
}
