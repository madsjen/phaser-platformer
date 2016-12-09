import io from 'socket.io-client';

export default class LobbyState extends Phaser.State {
	create() {
    this.socket = io.connect('http://localhost:3000/');

    this.game.stage.backgroundColor = '#71c5cf';

    const joinBtn = this.game.add.text(500, 100, 'This is a lobby');
    joinBtn.inputEnabled = true;
    joinBtn.addColor('#fff', 0);
	}

  update() {

  }

}