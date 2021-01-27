import Phaser from 'phaser'

import fablabTiles from '../resources/tiles/fablab_tiles.png'
import fablabTilesJson from '../resources/tiles/fablab.json'
import blankTile from '../resources/tiles/blankTile.png'
import blankHorizontalTiles from '../resources/tiles/blankHorizontalTiles.png'
import blankVerticalTiles from '../resources/tiles/blankVerticalTiles.png'

import Resources from '../resources/resources'
import MaterialBoxes from '../appliances/materialBoxes'
import WaitingTools from '../appliances/waitingTools'
import AssemblyTable from '../appliances/assemblyTable'

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
    }

    preloadTiles() {
        this.load.image('blankTile',blankTile);
        this.load.image('blankHorizontalTiles',blankHorizontalTiles);
        this.load.image('blankVerticalTiles',blankVerticalTiles);
        this.load.image('tiles',fablabTiles);
        this.load.tilemapTiledJSON('tilemap', fablabTilesJson);
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
                        continue;
                    }

                    if (Resources.isWaitingTool(id)) {
                        if (Resources.waitingTools["laserCutter"]["tileIds"].indexOf(id) !== -1) {
                            this.add.laserCutter(gridX,gridY);
                            continue;
                        }
                        if (Resources.waitingTools["threeDPrinter"]["tileIds"].indexOf(id) !== -1) {
                            this.add.threeDPrinter(gridX,gridY);
                            continue;
                        }
                    }

                    if (Resources.isAssemblyTable(id)) {
                        this.add.assemblyTable(gridX,gridY);
                        continue;
                    }
                }
                break;
            }
        }
    }
}