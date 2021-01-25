import Phaser from 'phaser'

import Game from './scenes/Game'

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 500,
    }
}

const game = new Phaser.Game(config);

// Add screens to the scene
game.scene.add('game', Game)

game.scene.start('game')