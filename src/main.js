import Phaser from 'phaser'

import TitleScreen from './scenes/TitleScene'
import Game from './scenes/Game'
import Preloader from './scenes/Preloader';

const config = {
    type: Phaser.AUTO,
    // width: 400,
    // height: 250,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 500,
        zoom: 4
    }
}

const game = new Phaser.Game(config);

// Add screens to the scene
game.scene.add('preloader', Preloader)
game.scene.add('titlescreen', TitleScreen)
game.scene.add('game', Game)

game.scene.start('preloader')