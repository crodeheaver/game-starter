import Phaser from 'phaser'

export default class extends Phaser.Group {
    
  constructor ({ game, parent, name, addToStage, enableBody, physicsBodyType, amount, asset }) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType)

    this.game = game
    
    this.createMultiple(amount, asset);
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    
  }

  update () {
    this.forEachExists(this.screenWrap, this);
  }
  
  screenWrap (bullet) {
    if (bullet.x < 0)
    {
        bullet.x = bullet.game.width;
    }
    else if (bullet.x > bullet.game.width)
    {
        bullet.x = 0;
    }

    if (bullet.y < 0)
    {
        bullet.y = bullet.game.height;
    }
    else if (bullet.y > bullet.game.height)
    {
        bullet.y = 0;
    }
  }

}
