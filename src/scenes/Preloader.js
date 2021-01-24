import Phaser from 'phaser'
import tileJSON from '../../public/tiles/fablab.json'
import image from '../../public/tiles/fablab_tiles.png'

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }
    
    preload() {
        this.load.image('tiles', image)
        this.load.tilemapTiledJSON('tilemap', tileJSON)
    }
 
    create() {
        this.scene.start('game')
    }
}