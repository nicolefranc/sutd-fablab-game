import Phaser from 'phaser'

import fablabTiles from '../resources/tiles/fablab_tiles.png'
import fablabTilesJson from '../resources/tiles/fablab.json'
import blankTile from '../resources/tiles/blankTile.png'

import Resources from '../resources/resources'
import MaterialBox from '../appliances/materialBoxes'

export default class Game extends Phaser.Scene {

    constructor(config){
        super(config)
    }

    preload() {
        this.preloadTiles();
    }

    create() {
        this.loadTiles();
        this.loadAppliances();
        //TODO autogenerate appliances
    }

    preloadTiles() {
        this.load.image('blankTile',blankTile)
        this.load.image('tiles',fablabTiles);
        this.load.tilemapTiledJSON('tilemap', fablabTilesJson)
    }

    loadTiles() {
        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('fablab_tiles', 'tiles')
        const floor = map.createLayer('Floor', tileset)
        const walls = map.createLayer('Walls', tileset)
    }

    loadAppliances() {
        for (var i=0;i<fablabTilesJson["layers"].length;i++) {
            var j = fablabTilesJson["layers"][i];
            if (j["name"] === "Walls") {
                for (var k=0;k<j["data"].length;k++) {
                    var gridX = k%j["width"];
                    var gridY = Math.floor(k/j["width"]);
                    var id = j["data"][k];
                    if (Resources.isMaterialBox(id)) {
                        for (var l in Resources.materialBoxes){
                            if (Resources.materialBoxes[l]["tileIds"].indexOf(id) !== -1) {
                                this.add.materialBox(gridX,gridY,l);
                                break;
                            }
                        }
                    }
                }
                break;
            }
        }
    }
}