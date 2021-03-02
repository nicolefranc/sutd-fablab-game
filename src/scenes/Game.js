import Phaser from "phaser";

// import fablabTiles from "../resources/tiles/tile sheet final2.png";
// import fablabTilesJson from "../resources/tiles/fablab_complete.json";
import fablabTiles from "../resources/tiles/tile-sheet-23feb.png";
// Easy
import fablabTilesJsonEasy from "../resources/tiles/easy/fablab-tiles-easy.json";
// Normal
import fablabTilesJsonNormal from "../resources/tiles/normal/fablab-tiles-normal.json";
// Hard
import fablabTilesJsonHard from "../resources/tiles/hard/fablab-tiles-hard.json";

import blankTile from "../resources/tiles/blankTile.png";
import blankHorizontalTiles from "../resources/tiles/blankHorizontalTiles.png";
import blankVerticalTiles from "../resources/tiles/blankVerticalTiles.png";

//Audio
import mainBGM from "../resources/audio/Gameplay.wav";

//Resources
import Resources from "../resources/resources";
import InteractiveTools from "../appliances/interactiveTools";
import MaterialBoxes from "../appliances/materialBoxes";
import WaitingTools from "../appliances/waitingTools";
import Bin from "../appliances/bin";
import AssemblyTable from "../appliances/assemblyTable";
import Player from "../sprites/Player.js";
import ScoreController from "../controllers/scoreController";

//Buttons
import Button from "../sprites/button";
import options from "../resources/Main Menu/options.png";
import optionsPrs from "../resources/Main Menu/options_prs.png";

//Player
import PlayerPlaceholderSprite from "../resources/Gurl/down-00.png";
import playerSpriteSheet from "../resources/players.png";
import playerSpriteJson from "../resources/players.json";

//Utils
import VirtualJoystickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin";
import eventsCenter from "../events/EventsCenter";
import mPickBtn from "../resources/mobile/interactivebutton.png";
import mPickBtnPressed from "../resources/mobile/interactivebuttonpressed.png";

import LeaderboardUtils from "../leaderboard/leaderboardUtils";
import OrderDisplay from "../controllers/orderDisplay";
import InitialTutorial from "./InitialTutorial";

export default class Game extends Phaser.Scene {
    constructor(config) {
        super(config);
        //LeaderboardUtils.get("/",(chunk) => {alert(chunk)}, ()=> {});
    }

    init(data) {
        console.log(data);
        this.difficulty = data.difficulty;
    }

    static preloadAssets(scene) {
        
        Game.preloadTiles(scene);
        Game.preloadAudio(scene);
        Game.preloadPlayerAnims(scene);
        Game.preloadButton(scene);
        

        scene.load.plugin(
            'rex-virtual-joystick-plugin',
            VirtualJoystickPlugin,
            true
        );
        // this.load.image("mPickBtn", mPickBtn);
        // this.load.image("mPickBtnPressed", mPickBtnPressed);
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.isMobile =
            this.scene.systems.game.device.os.android ||
            this.scene.systems.game.device.os.iOS ||
            this.scene.systems.game.device.os.iPhone ||
            this.scene.systems.game.device.os.windowsPhone;
        this.loadTiles();
        this.loadAppliances();
        this.loadAudio();
        this.loadPlayerAnims();
        this.scoreController = this.add.scoreController(
            0.25,
            3,
            ["jigsawAcrylic", "jigsawWood", "threeDPrint"],
            3,
            100
        );

        this.player = this.add.player(
            350,
            300,
            "playersprite",
            0,
            this.scoreController
        );
        this.player.scale = 0.3;

        for (var i in this.assemblyTables)
            this.assemblyTables[i].attachScoreController(this.scoreController);

        this.loadButton();
        this.orderDisplay = new OrderDisplay(0, 0, this);
        this.scoreController.attachOrderDisplay(this.orderDisplay);
        this.scoreController.start();

        this.physics.add.collider(this.player, this.walls);

        if (this.isMobile) this.setupMobile();

    }

    mobilePickItem(mCursors) {
        this.player.update(mCursors);
    }

    setupMobile() {
        this.cameras.main.startFollow(this.player, true);
        this.createVirtualJoystick();

        this.scene.run("GameUI");
        this.scene.bringToTop("GameUI");

        eventsCenter.on("mPickItem", this.mobilePickItem, this);
    }

    createVirtualJoystick() {
        this.joyStick = this.plugins
            .get('rex-virtual-joystick-plugin"')
            .add(this, {
                // x: 725,
                x: 100,
                y: 400,
                // y: 425,
                radius: 50,
                base: this.add.circle(0, 0, 60, 0x888888),
                thumb: this.add.circle(0, 0, 35, 0xcccccc),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            })
            .on("update", this.updateJoystickState, this);
    }

    updateJoystickState() {
        this.cursors = this.joyStick.createCursorKeys();
    }


    static preloadTiles(scene) {
        scene.load.image("blankTile", blankTile);
        scene.load.image("blankHorizontalTiles", blankHorizontalTiles);
        scene.load.image("blankVerticalTiles", blankVerticalTiles);
        scene.load.image("tiles", fablabTiles);
        scene.load.image("playersprite", PlayerPlaceholderSprite);
        scene.load.tilemapTiledJSON("tilemap_hard", fablabTilesJsonHard);
        scene.load.tilemapTiledJSON("tilemap_normal", fablabTilesJsonNormal);
        scene.load.tilemapTiledJSON("tilemap_easy", fablabTilesJsonEasy);
        
    }

    static preloadAudio(scene) {
        scene.load.audio("mainBGM", mainBGM);
    }

    static preloadPlayerAnims(scene) {
        scene.load.image("playersprite", PlayerPlaceholderSprite);
        scene.load.atlas("playeranims", playerSpriteSheet, playerSpriteJson);
    }
    static preloadButton(scene) {
        //TODO: change to actual pause btn
        scene.load.image("pauseBtn", options);
        scene.load.image("pauseBtnPrs", optionsPrs);
    }

    loadTiles() {
        let map = this.make.tilemap({ key: "tilemap_"+this.difficulty });
        // const tileset = map.addTilesetImage("fablab_tileset_complete", "tiles");
        let tileset = map.addTilesetImage("tile-sheet-23feb", "tiles");
        let floor = map.createLayer("Floor", tileset);
        this.walls = map.createLayer("Walls", tileset);
        // this.renderCollisionWalls(walls);
        let debugGraphics = this.add.graphics().setAlpha(0.7);
        this.walls.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255),
        });
        this.walls.setCollisionByProperty({ collides: true });
    }
    loadButton() {
        var scale = 500 / 768;
        const pauseBtn = new Button(
            this,
            (1000 / 1090) * 800,
            (150 / 768) * 500,
            "pauseBtn",
            scale / 2,
            () => {
                this.pauseGame();
            },
            "pauseBtnPrs"
        );
        // pauseBtn.setScrollFactor(0);
        // pauseBtn.setInteractive();
        // pauseBtn.on("pointerdown", () => this.scene.pause("Game"));
        // this.events.on("pause", () => this.scene.run("Pause"));
        // this.events.on("resume", () => this.scene.stop("Pause"));
    }

    loadAudio() {
        const bgm = this.sound.add("mainBGM");
        bgm.play();
    }

    loadAppliances() {
        this.assemblyTables = [];
        switch (this.difficulty) {
            case "hard":
                
                this.tileLayers = fablabTilesJsonHard["layers"];
                break;
            case "normal":
                
                this.tileLayers = fablabTilesJsonNormal["layers"];
                break;
            default:
                
                this.tileLayers = fablabTilesJsonEasy["layers"];
        }
        this.bins = [];
        for (var i = 0; i < this.tileLayers.length; i++) {
            var j = this.tileLayers[i];
            if (j["name"] === "Walls") {
                for (var k = 0; k < j["data"].length; k++) {
                    var gridX = k % j["width"];
                    var gridY = Math.floor(k / j["width"]);
                    var id = j["data"][k];

                    if (Resources.isMaterialBox(id)) {
                        for (var l in Resources.materialBoxes) {
                            if (
                                Resources.materialBoxes[l]["tileIds"].indexOf(
                                    id
                                ) !== -1
                            ) {
                                this.add.materialBox(gridX, gridY, l);
                                break;
                            }
                        }
                        continue;
                    }

                    if (Resources.isWaitingTool(id)) {
                        if (
                            Resources.waitingTools["laserCutter"][
                                "tileIds"
                            ].indexOf(id) !== -1
                        ) {
                            this.add.laserCutter(gridX, gridY);
                            continue;
                        }
                        if (
                            Resources.waitingTools.threeDPrinter.tileIds.indexOf(
                                id
                            ) !== -1
                        ) {
                            this.add.threeDPrinter(gridX, gridY);
                            continue;
                        }
                    }

                    if (Resources.isAssemblyTable(id)) {
                        this.assemblyTables.push(
                            this.add.assemblyTable(
                                gridX,
                                gridY,
                                this.scoreController
                            )
                        );
                        continue;
                    }
                    if (Resources.isBin(id)) {
                        this.bins.push(this.add.bin(gridX, gridY));
                        continue;
                    }
                    if (Resources.isInteractiveTool(id)) {
                        if (
                            Resources.interactiveTools.drill.tileIds.indexOf(
                                id
                            ) !== -1
                        ) {
                            this.add.drill(gridX, gridY);
                            continue;
                        }
                        if (
                            Resources.interactiveTools.saw.tileIds.indexOf(
                                id
                            ) !== -1
                        ) {
                            this.add.saw(gridX, gridY);
                            continue;
                        }
                        if (
                            Resources.interactiveTools.solderStation.tileIds.indexOf(
                                id
                            ) !== -1
                        ) {
                            this.add.solderStation(gridX, gridY);
                            continue;
                        }
                    }
                }
                break;
            }
        }
    }

    loadPlayerAnims() {
        const dirns = ["down", "up", "right"];
        const chars = ["Boi", "Gurl"];
        for (let dirn of dirns) {
            for (let c of chars) {
                const frameNames = this.anims.generateFrameNames(
                    "playeranims",
                    {
                        prefix: c + "/" + dirn + "-",
                        suffix: ".png",
                        zeroPad: 2,
                        start: 0,
                        end: 2,
                    }
                );
                //alert(frameNames.length);
                this.anims.create({
                    key: c + "-" + dirn,
                    frames: frameNames,
                    frameRate: 10,
                    //duration: null,
                    repeat: -1,
                });
            }
        }
    }
    pauseGame() {
        this.scene.run("Pause");
        this.scene.pause("Game");
        this.scene.bringToTop("Pause");
    }

    update() {
        if (InitialTutorial.firstGame) {
            this.scene.pause("Game");
            this.scene.run("InitialTutorial");
            this.scene.bringToTop("InitialTutorial");
        }
        this.player.update(this.cursors);
        if (this.scoreController.isEndgame) {
            this.scene.pause("Game");
            this.scene.run("Endgame");
            this.scene.bringToTop("Endgame");
        }
        // if (this.isMobile){
        //     let width = this.sys.canvas.width;
        //     let height = this.sys.canvas.height;
        //     let dx = this.player.x + this.cameras.main.x - width/2;
        //     let dy = this.player.y + this.cameras.main.y - height/2;
        //     this.cameras.main.x -= dx/10;
        //     this.cameras.main.y -= dy/10;
        // }
    }
}
