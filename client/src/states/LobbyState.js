import socket from '../socket';

export default class LobbyState extends Phaser.State {
  lobbyName = '';
  players = [];

  init(lobbyName) {
    this.lobbyName = lobbyName;
  }

	create() {
    this.game.stage.backgroundColor = '#71c5cf';

    const joinBtn = this.game.add.text(400, 100, 'Lobby: ' + this.lobbyName);
    joinBtn.inputEnabled = true;
    joinBtn.addColor('#fff', 0);

    this.playerCount = this.game.add.text(400, 200, 'Players: ' + this.players.length);
    this.playerCount.inputEnabled = true;
    this.playerCount.addColor('#fff', 0);

    socket.emit('lobby:init', this.lobbyName);

    socket.on('lobby:change', (players) => {
      console.log(players)
      this.players = players;
      this.playerCount.setText('Players: ' + Object.keys(players).length);
    });
	}

  update() {

  }

  showPlayers() {

  }

}