import Player from '../sprites/Player';
import Platform from '../sprites/Platform';

export default class GameState extends Phaser.State {
	preload() {
    this.game.load.image('player', 'src/assets/player.png'); 
    this.game.load.image('platform', 'src/assets/grass-20x20.png'); 
	}

	create() {
    this.game.stage.backgroundColor = '#71c5cf';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create empty groups
    this.platforms = this.game.add.group();

    this.addPlatforms(100, 400, 10);

    this.player = new Player(this, 100, 245);
	}

  update() {
    this.game.physics.arcade.collide(this.player, this.platforms);

    // If the player is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (this.player.y < 0 || this.player.y > 700) {
        this.restartGame();
    }
  }

  addPlatforms(x, y, amount) {
    for(let i = 0; i < amount; i++) {
      this.platforms.add(new Platform(this.game, x, y));
      x += 20;
    }
  }

  // Restart the game
  restartGame() {
    // Start the 'main' state, which restarts the game
    this.game.state.start('main');
  }
}