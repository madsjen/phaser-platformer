import socket from '../socket';
import GameState from './GameState';
import LobbyState from './LobbyState';

export default class MainState extends Phaser.State {
	create() {
    this.game.stage.backgroundColor = '#71c5cf';

    const joinBtn = this.game.add.text(500, 300, 'Join lobby');
    joinBtn.inputEnabled = true;
    joinBtn.addColor('#fff', 0);
    joinBtn.events.onInputDown.add(this.joinLobby.bind(this));

    const createBtn = this.game.add.text(500, 350, 'Create lobby');
    createBtn.inputEnabled = true;
    createBtn.addColor('#fff', 0);
    createBtn.events.onInputDown.add(this.createLobby.bind(this));
	}

  update() {

  }

  joinLobby() {
    const lobbyName = prompt('Lobby name');

    socket.emit('lobby:join', lobbyName);
    socket.on('lobby:join', (canJoin) => {
      if(canJoin) {
        this.state.add('lobby', LobbyState, false);
        this.state.start('lobby', true, false, lobbyName);  
      }
    });
  }

  createLobby() {
    const lobbyName = prompt('Lobby name');
    this.state.add('lobby', LobbyState, false);
    this.state.start('lobby', true, false, lobbyName);
  }

  startGame() {
    this.state.add('game', GameState, false);
    this.state.start('game');
  }
}