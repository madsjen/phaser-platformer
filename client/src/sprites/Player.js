class Player extends Phaser.Sprite {
  constructor(state, x, y, playerId, canBeControlled) {
    super(state.game);
    this.state = state;

    const { game } = this.state;
    
    this.player = game.add.sprite(x, y, 'player');

    const { player } = this;

    game.physics.arcade.enable(player);
    player.body.gravity.y = 1000;
    player.anchor.setTo(-0.2, 0.5); 
    player.body.blocked.down = true;

    if(canBeControlled) {
      // walk left
      this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
      this.aKey.onDown.add(this.walk, this);  
      this.aKey.onUp.add(this.walk, this);  

      // walk right
      this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
      this.dKey.onDown.add(this.walk, this);  
      this.dKey.onUp.add(this.walk, this);  

      // jump
      this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.spaceKey.onDown.add(this.jump, this); 
    }

    this.playerId = playerId;

    return player;
  }

  walk() {
    const { aKey, dKey, player } = this;

    let velocity = 0;

    if(aKey.isDown) {
      velocity = aKey.isDown ? -200 : 0;
    }

    if(dKey.isDown) {
      velocity = dKey.isDown ? 200 : 0;
    }

    player.body.velocity.x = velocity
  }

  jump() {
    if(this.player.body.velocity.y !== 0) return;
    this.player.body.velocity.y = -400;
  }
}

export default Player;