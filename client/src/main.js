import MainState from './states/MainState';
import GameState from './states/GameState';

class AwesomeGame extends Phaser.Game {
	constructor() {
		super(1200, 700, Phaser.AUTO, 'content', null);
		this.state.add('main', GameState, false);
		this.state.start('main');
	}
}

new AwesomeGame();