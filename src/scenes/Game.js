import Phaser from 'phaser'

import fablabTiles from '../resources/tiles/fablab_tiles.png'
import fablabTilesJson from '../resources/tiles/fablab.json'

export default class Game extends Phaser.Scene {

    constructor(config){
        super(config)
    }

    preload() {
        this.preloadTiles();
    }

    create() {
        this.loadTiles();
        //TODO autogenerate appliances
    }

    preloadTiles() {
        this.load.image('tiles',fablabTiles);
        this.load.tilemapTiledJSON('tilemap', fablabTilesJson)
    }

    loadTiles() {
        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('fablab_tiles', 'tiles')
        const floor = map.createLayer('Floor', tileset)
        const walls = map.createLayer('Walls', tileset)
    }
}