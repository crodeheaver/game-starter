import Phaser from 'phaser'

export default class Asteroid extends Phaser.Sprite {

  constructor ({ game, x, y, asset, physics, type }) {
    super(game, x, y, asset)

    this.game = game
    this.type = type;
    this.anchor.setTo(0.5)
    this.rotation += Math.floor(Math.random() * 20) + 3

    this.game.physics.arcade.enable(this)
    if (this.type === 'Large') {
      this.body.velocity.set(Math.floor(Math.random() * 20) + 20)
      this.game.physics.arcade.velocityFromRotation(this.rotation, 20, this.body.velocity)
    } else if(this.type == 'Medium') {
      this.scale.setTo(.6)
      this.body.velocity.set(Math.floor(Math.random() * 40) + 40)
      this.game.physics.arcade.velocityFromRotation(this.rotation, 40, this.body.velocity)
    } else if (this.type == 'Small') {
      this.scale.setTo(.2)
      this.body.velocity.set(Math.floor(Math.random() * 60) + 60)
      this.game.physics.arcade.velocityFromRotation(this.rotation, 60, this.body.velocity)
    }
  }

  update () {
    this.rotation += 0.01
    this.game.world.wrap(this, 16)
  }

  destroy () {
    let type = ''
    if (this.type == "Large") {
      type = 'Medium'
    } else if (this.type == 'Medium') {
      type = 'Small'
    }
    if (type !== '') {
      let newAsteroids = Array.from(
      new Array(3), (x, i) => new Asteroid({
        game: this.game,
        x: Math.floor((Math.random() * 25) + this.x),
        y: Math.floor((Math.random() * 25) + this.y),
        asset: 'asteroid',
        physics: Phaser.Physics.ARCADE,
        type: type
      }))
      
      newAsteroids.forEach(asteroid => this.game.asteroids.push(asteroid))
      
      newAsteroids.forEach(asteroid => this.game.add.existing(asteroid))
    }

    super.destroy()
  }
}
