import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset, physics }) {
    super(game, x, y, asset)

    this.game = game
    this.anchor.setTo(0.5)
    
    this.game.physics.arcade.enable(this);
    
    //this.body.angularVelocity = 90;
    
  }

  update () {
        //this.game.physics.arcade.accelerationFromRotation(this.rotation, 200, this.body.acceleration);

        this.body.velocity.set(Math.floor(Math.random() * 20));
        //this.body.angularVelocity = -300;
        //this.body.angularVelocity = 300;
        this.body.angularVelocity = Math.floor(Math.random() * 20);
        this.screenWrap();
      
  }
  
  screenWrap () {

    if (this.x < 0)
    {
        this.x = this.game.width;
    }
    else if (this.x > this.game.width)
    {
        this.x = 0;
    }

    if (this.y < 0)
    {
        this.y = this.game.height;
    }
    else if (this.y > this.game.height)
    {
        this.y = 0;
    }
  }

}
