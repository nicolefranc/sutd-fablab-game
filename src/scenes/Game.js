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
import Player from '../sprites/Player.js'
import ScoreController from '../controllers/scoreController'

import PlayerPlaceholderSprite from '../resources/Gurl/down-00.png'

export default class Game extends Phaser.Scene {

    constructor(config){
        super(config)
    }

    preload() {
        this.preloadTiles();
        
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        
        this.loadTiles();
        this.loadAppliances();

        this.scoreController = this.add.scoreController(0.25,1,["jigsawAcrylic","jigsawWood","threeDPrint"],3,100);

        this.player = this.add.player(250,400,"playersprite",0,this.scoreController);
        this.player.scale = 0.3;

        for (var i in this.assemblyTables) this.assemblyTables[i].attachScoreController(this.scoreController);

        this.scoreController.start();
        
    }

    preloadTiles() {
        this.load.image('blankTile',blankTile);
        this.load.image('blankHorizontalTiles',blankHorizontalTiles);
        this.load.image('blankVerticalTiles',blankVerticalTiles);
        this.load.image('tiles',fablabTiles);

        this.load.image('playersprite', PlayerPlaceholderSprite);

        this.load.tilemapTiledJSON('tilemap', fablabTilesJson);
    }

    loadTiles() {
        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('fablab_tiles', 'tiles')
        const floor = map.createLayer('Floor', tileset)
        const walls = map.createLayer('Walls', tileset)
    }

    loadAppliances() {
        this.assemblyTables = [];
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
                            this.add.threeDPrinter(gridX,gridY)
                            continue;
                        }
                    }

                    if (Resources.isAssemblyTable(id)) {
                        this.assemblyTables.push(this.add.assemblyTable(gridX,gridY,this.scoreController));
                        continue;
                    }
                }
                break;
            }
        }
    }

    update(){
        this.player.update(this.cursors);
    }
}