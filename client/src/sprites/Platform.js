class Platform extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game);

    // Create a platform at the position x and y
    let platform = this.game.add.sprite(x, y, 'platform');

    // Enable physics on the platform 
    game.physics.arcade.enable(platform);

    platform.body.immovable = true;

    return platform;
  }
}

export default Platform; 