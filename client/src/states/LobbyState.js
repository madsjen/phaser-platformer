import _ from 'lodash';
import socket from '../socket';
import GameState from './GameState';

export default class LobbyState extends Phaser.State {
  lobbyName = '';
  player = {};
  allPlayers = [];
  otherPlayers = [];

  init(lobbyName) {
    this.lobbyName = lobbyName;
  }

	create() {
    this.game.stage.backgroundColor = '#71c5cf';

    const joinBtn = this.game.add.text(400, 100, 'Lobby: ' + this.lobbyName);
    joinBtn.addColor('#fff', 0);

    this.playerCount = this.game.add.text(400, 200, 'Players: ' + (this.otherPlayers.length + 1));
    this.playerCount.addColor('#fff', 0);

    const startGameBtn = this.game.add.text(400, 300, 'Start Game!');
    startGameBtn.inputEnabled = true;
    startGameBtn.addColor('#fff', 0);
    startGameBtn.events.onInputDown.add(this.startGame.bind(this));

    socket.emit('lobby:init', this.lobbyName);

    socket.on('lobby:change', (data) => {
      const { player, allPlayers } = data;

      this.allPlayers = allPlayers;

      if(!this.player.length && player.length) {
        this.player = player;
      }

      this.otherPlayers = _.omit(allPlayers, this.player);

      this.playerCount.setText('Players: ' + (Object.keys(this.otherPlayers).length + 1) );
    });

    socket.on('lobby:startGame', () => {
      this.state.add('game', GameState, false);
      this.state.start('game', true, false, this.player, this.allPlayers);
    })
	}

  update() {

  }

  startGame() {
    socket.emit('lobby:startGame');
  }

}