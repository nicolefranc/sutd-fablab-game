import Phaser from 'phaser'
import tileJSON from '../../public/tiles/fablab.json'
// import image from '../../public/tiles/fablab_tiles.png'
import fablab_tiles_64 from '../../public/tiles/fablab_tiles.png'

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }
    
    preload() {
        this.load.image('tiles', fablab_tiles_64)
        this.load.tilemapTiledJSON('tilemap', tileJSON)
    }
 
    create() {
        this.scene.start('game')
    }
}