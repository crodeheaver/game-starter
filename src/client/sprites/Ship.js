import Phaser from 'phaser'
// import Bullets from './Bullets'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset, physics }) {
    super(game, x, y, asset)

    this.game = game

    this.weapon = game.add.weapon(30, 'bullet')

    //  The bullets will be automatically killed when they are 2000ms old
    this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN
    this.weapon.bulletLifespan = 2000

    //  The speed at which the bullet is fired
    this.weapon.bulletSpeed = 600

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon.fireRate = 100

    //  Wrap bullets around the world bounds to the opposite side
    this.weapon.bulletWorldWrap = true

    this.anchor.setTo(0.5)

    this.game.physics.arcade.enable(this)
    this.game.physics.arcade.enable(this.weapon)

    this.body.drag.set(100)
    this.body.maxVelocity.set(200)

    this.weapon.trackSprite(this, 0, 0, true)
  }

  update () {
    if (this.game.key_thrust.isDown) {
      this.game.physics.arcade.accelerationFromRotation(this.rotation, 200, this.body.acceleration)
    } else {
      this.body.acceleration.set(0)
    }

    if (this.game.key_left.isDown) {
      this.body.angularVelocity = -300
    } else if (this.game.key_right.isDown) {
      this.body.angularVelocity = 300
    } else {
      this.body.angularVelocity = 0
    }

    if (this.game.key_fire.isDown) {
      this.weapon.fire()
    }

    if (this.game.reset.isDown) {
      this.reset(this.game.width / 2,this.game.height / 2)
    }

    for (let i = 0; i < this.game.asteroids.length; i++) {
      this.game.physics.arcade.collide(this, this.game.asteroids[i], this.collisionCallback, this.processCallback, this)
    }
    this.weapon.forEach(this.AsteroidColl, this)
    this.game.world.wrap(this, 16)
  }

  AsteroidColl (sprite) {
    for (let i = 0; i < this.game.asteroids.length; i++) {
      this.game.physics.arcade.collide(sprite, this.game.asteroids[i], this.asteroidHit, this.processCallback, this)
    }
  }
  processCallback (obj1, obj2) {
    //  This function can perform your own additional checks on the 2 objects that collided.
    //  For example you could test for velocity, health, etc.
    //  This function needs to return either true or false. If it returns true then collision carries on (separating the two objects).
    //  If it returns false the collision is assumed to have failed and aborts, no further checks or separation happen.
    return true
  }

  asteroidHit (bullet, asteroid) {
    bullet.destroy()
    asteroid.destroy()
  }

  collisionCallback (obj1, obj2) {
    obj1.kill()
  }

  render () {
    this.weapon.debug()
  }
}
