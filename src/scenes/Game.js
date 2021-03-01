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
import AssemblyTable from "../appliances/assemblyTable";
import Player from "../sprites/Player.js";
import ScoreController from "../controllers/scoreController";
import Button from "../sprites/button.js";

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

export default class Game extends Phaser.Scene {
    constructor(config) {
        super(config);
        //LeaderboardUtils.get("/",(chunk) => {alert(chunk)}, ()=> {});
    }

    init(data) {
        console.log(data);
        this.difficulty = data.difficulty;
    }

    preload() {
        Resources.preloadMaterialImages(this);
        this.preloadTiles();
        this.preloadAudio();
        this.preloadPlayerAnims();
        this.preloadButton();
        this.cursors = this.input.keyboard.createCursorKeys();

        this.load.plugin(
            'rex-virtual-joystick-plugin"',
            VirtualJoystickPlugin,
            true
        );
        // this.load.image("mPickBtn", mPickBtn);
        // this.load.image("mPickBtnPressed", mPickBtnPressed);
    }

    create() {
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

    loadTiledJson(args) {
        console.log("Loading tiles...");
        console.log(args.difficulty);

        args.game.load.tilemapTiledJSON("tilemap", fablabTilesJsonEasy);
    }

    preloadTiles() {
        this.load.image("blankTile", blankTile);
        this.load.image("blankHorizontalTiles", blankHorizontalTiles);
        this.load.image("blankVerticalTiles", blankVerticalTiles);
        this.load.image("tiles", fablabTiles);
        this.load.image("playersprite", PlayerPlaceholderSprite);

        console.log(this.difficulty);
        switch (this.difficulty) {
            case "hard":
                this.load.tilemapTiledJSON("tilemap", fablabTilesJsonHard);
                this.tileLayers = fablabTilesJsonHard["layers"];
            case "normal":
                this.load.tilemapTiledJSON("tilemap", fablabTilesJsonNormal);
                this.tileLayers = fablabTilesJsonNormal["layers"];
            default:
                this.load.tilemapTiledJSON("tilemap", fablabTilesJsonEasy);
                this.tileLayers = fablabTilesJsonEasy["layers"];
        }
    }

    preloadAudio() {
        this.load.audio("mainBGM", mainBGM);
    }

    preloadPlayerAnims() {
        this.load.image("playersprite", PlayerPlaceholderSprite);
        this.load.atlas("playeranims", playerSpriteSheet, playerSpriteJson);
    }
    preloadButton() {
        //TODO: change to actual pause btn
        this.load.image("pauseBtn", options);
        this.load.image("pauseBtnPrs", optionsPrs);
    }

    loadTiles() {
        const map = this.make.tilemap({ key: "tilemap" });
        // const tileset = map.addTilesetImage("fablab_tileset_complete", "tiles");
        const tileset = map.addTilesetImage("tile-sheet-23feb", "tiles");
        const floor = map.createLayer("Floor", tileset);
        this.walls = map.createLayer("Walls", tileset);
        // this.renderCollisionWalls(walls);
        const debugGraphics = this.add.graphics().setAlpha(0.7);
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
        this.menu = this.add.image(500);
        this.scene.run("Pause");
        this.scene.pause("Game");
        this.scene.bringToTop("Pause");
    }

    update() {
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
