import socket from '../socket';
import Player from '../sprites/Player';
import Platform from '../sprites/Platform';

export default class GameState extends Phaser.State {
  playerId = '';
  allPlayers = {};
  players = [];
  playerReferences = [];

	preload() {
    this.game.load.image('player', 'src/assets/player.png'); 
    this.game.load.image('platform', 'src/assets/grass-20x20.png'); 
	}

  init(playerId, allPlayers) {
    this.playerId = playerId;
    this.allPlayers = allPlayers;
  }

	create() {
    this.game.stage.backgroundColor = '#71c5cf';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create empty groups
    this.platforms = this.game.add.group();
    this.players = this.game.add.group();

    this.addPlayers(140, 245);

    this.addPlatforms(100, 400, 10);

    //this.player = new Player(this, 100, 245, this.playerId, true);
	}

  update() {
    this.game.physics.arcade.collide(this.players, this.platforms);

    // If the player is out of the screen (too high or too low)
    // Call the 'restartGame' function
    //if (this.player.y < 0 || this.player.y > 700) {
    //    this.restartGame();
    //}

    socket.on('player:move', (playerId, x, y) => {
      if(this.playerId === playerId) {
        return;
      }

      this.players.forEach(player => {
        this.playerReferences.forEach((playerRef, i) => {
          if(!playerRef.hasOwnProperty(this.playerId)) {
            const ref = Object.values(playerRef)[0];
            if(ref === player) {
              ref.x = x;
              ref.y = y;
              player.x = x;
              player.y = y;
            }
          }
        });
      });
    }); 

    this.playerReferences.forEach((player, i) => {
      if(Object.keys(player)[0] === this.playerId) {
        socket.emit('player:move', this.playerId, Object.values(player)[0].body.x, Object.values(player)[0].body.y);
      }
    });

  }

  addPlayers(x, y) {
    for(const p in this.allPlayers) {
      const canBeControlled = p === this.playerId;

      const newPlayer = new Player(this, x, y, p, canBeControlled);

      const sprite = {};
      sprite[p] = newPlayer;

      this.playerReferences.push(sprite);

      this.players.add(newPlayer); 
      
      x += 40;
    };
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