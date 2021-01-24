import Phaser from 'phaser'

import TitleScreen from './scenes/TitleScene'
import Game from './scenes/Game'


import LevelUtil from './util/LevelUtil'

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1600,
        height: 1000
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0},
            debug: true
        }
    }
}

const game = new Phaser.Game(config);

// Add screens to the scene
game.scene.add('game', Game)
game.scene.add('titlescreen', TitleScreen)


game.scene.start('game')