import Phaser from 'phaser'
import MaterialBoxes from '../items/MaterialBoxes'
/*import LevelUtil from '../util/LevelUtil'
import ItemController from '../controllers/ItemController';
import ScoreController from '../controllers/ScoreController'
import AssemblyTable from '../appliances/AssemblyTable';
import MaterialBox from '../appliances/MaterialBox';
import img from '../acrylicBox.png';*/

import jso from '../dungeon-01.json';

export default class Game extends Phaser.Scene {
    preload() {
        //alert('/scenes/tiles/dungeon-01.json');
        //this.load.json('jsonData', level);
        this.load.tilemapTiledJSON('dungeon',jso);
        this.scenario4Preload();
    }

    create() {
        //this.scenario4Create();

    }

    update() {
        //this.scenario3Update();
    }

    // Test scenario 1
    scenario1Create() {
        this.item = null;
        this.add.text(400, 250, 'Game')
        this.table = new WaitingTool(100,100,this,null,"wood","metalSheet",10,2000,10,2000,0.1);
        this.rSelected = this.add.rectangle(100,300,LevelUtil.tileSize,LevelUtil.tileSize,0x000000);
        this.rWood = this.add.rectangle(100,400,LevelUtil.tileSize,LevelUtil.tileSize,0xff0000);
        this.rWood.setInteractive();
        this.rWood.on('pointerup', () => {
            this.item = "wood";
            this.rSelected.fillColor = Items.itemList["wood"]["color"];
            alert("Loaded wood onto player");
        });
        this.rFilament = this.add.rectangle(200,400,LevelUtil.tileSize,LevelUtil.tileSize,0x00ff00);
        this.rFilament.setInteractive();
        this.rFilament.on('pointerup', () => {
            this.item = "filament";
            this.rSelected.fillColor = Items.itemList["filament"]["color"];
            alert("Loaded filament onto player");
        });
        this.rMetalSheet = this.add.rectangle(300,400,LevelUtil.tileSize,LevelUtil.tileSize,0x0000ff);
        this.rMetalSheet.setInteractive();
        this.rMetalSheet.on('pointerup', () => {
            this.item = "metalSheet";
            this.rSelected.fillColor = Items.itemList["metalSheet"]["color"];
            alert("Loaded metal sheet onto player");
        });
        this.rMetalSheet = this.add.rectangle(400,400,LevelUtil.tileSize,LevelUtil.tileSize,0x000000);
        this.rMetalSheet.setInteractive();
        this.rMetalSheet.on('pointerup', () => {
            this.item = null;
            this.rSelected.fillColor = "0x000000";
            alert("Loaded null onto player");
        });

        this.rSelected.setInteractive();
        this.rSelected.on('pointerup', () => {
            this.item = this.table.interact(this.item);
            if (this.item !== null) this.rSelected.fillColor = Items.itemList[this.item]["color"];
            else this.rSelected.fillColor = "0x000000";
        });
    }

    // Test scenario 2
    scenario2Create(){
        this.itemController = new ItemController(400,250,this,null,["wood","filament","metalSheet"],3);
        this.scoreController = new ScoreController(400,150,this);
        this.assemblyTable = new AssemblyTable(100,300,this,null);
        this.assemblyTable.attachItemController(this.itemController);
        this.assemblyTable.attachScoreController(this.scoreController);
        this.rWood = this.add.rectangle(100,400,LevelUtil.tileSize,LevelUtil.tileSize,0xff0000);
        this.rWood.setInteractive();
        this.rWood.on('pointerup', () => {
            this.assemblyTable.interact("wood");
        });
        this.rFilament = this.add.rectangle(200,400,LevelUtil.tileSize,LevelUtil.tileSize,0x00ff00);
        this.rFilament.setInteractive();
        this.rFilament.on('pointerup', () => {
            this.assemblyTable.interact("filament");
        });
        this.rMetalSheet = this.add.rectangle(300,400,LevelUtil.tileSize,LevelUtil.tileSize,0x0000ff);
        this.rMetalSheet.setInteractive();
        this.rMetalSheet.on('pointerup', () => {
            this.assemblyTable.interact("metalSheet");
        });
        this.rMetalSheet = this.add.rectangle(400,400,LevelUtil.tileSize,LevelUtil.tileSize,0x000000);
        this.rMetalSheet.setInteractive();
        this.rMetalSheet.on('pointerup', () => {
            this.assemblyTable.interact(null);
        });
    }

    // Test scenario 3
    scenario3Preload(){
        alert(img);
        this.load.image('materialBox',img);
    }

    scenario3Create(){
        this.materialBoxes = {}
        this.materialBoxes["sprites"] = [];
        this.rect = this.add.rectangle(900,700,50,50,0xff0000);
        this.physics.add.existing(this.rect);
        this.rect.body.setCollideWorldBounds(true);
        this.materialBoxes["hitboxes"] = this.physics.add.staticGroup();
        this.materialBox = new MaterialBox(0,0,this,"Acrylic");
        this.cursors = this.input.keyboard.createCursorKeys();
        //this.t = this.physics.add.staticGroup();
        this.physics.add.collider(this.rect,this.materialBoxes["hitboxes"]);
        //this.rect2 = this.add.rectangle(549,439,100,100,"0xffffff");
        //this.physics.add.existing(this.rect2);
        //this.t.add(this.rect2);
        //this.physics.add.collider(this.rect,this.t);
    }

    scenario3Update(){
        switch (""+this.cursors.left.isDown+this.cursors.right.isDown){
            case "truefalse":
                this.rect.body.velocity.x = -200;
                break;
            case "falsetrue":
                this.rect.body.velocity.x = 200;
                break;
            default:
                this.rect.body.velocity.x = 0;
        }
        switch (""+this.cursors.up.isDown+this.cursors.down.isDown){
            case "truefalse":
                this.rect.body.velocity.y = -200;
                break;
            case "falsetrue":
                this.rect.body.velocity.y = 200;
                break;
            default:
                this.rect.body.velocity.y = 0;
        }
    }

    // Test scenario 4
    scenario4Preload() {
        var i = Object.keys(MaterialBoxes.materialBoxesList);
        for (var j=0;j<i.length;j++){
            alert(MaterialBoxes.materialBoxesList[i[j]]["path"]);
        }
    }

    scenario4Create() {
        this.item = null;
        this.materialBox = new MaterialBox(0,100,this,"Acrylic");
    }

}