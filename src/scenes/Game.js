import Phaser from "phaser";
import SettingsMenu from "../scenes/SettingsMenu";

// import fablabTiles from "../resources/tiles/tile sheet final2.png";
// import fablabTilesJson from "../resources/tiles/fablab_complete.json";
import fablabTiles from "../resources/tiles/tile sheet 3march.png";
// Easy
import fablabTilesJsonEasy from "../resources/tiles/easy/fablab-tiles-easy.json";
import mFablabTilesJsonEasy from "../resources/tiles/easy/fablab-tiles-easy-mobile.json";
// Normal
import fablabTilesJsonNormal from "../resources/tiles/normal/fablab-tiles-normal.json";
import mFablabTilesJsonNormal from "../resources/tiles/normal/fablab-tiles-normal-mobile.json";
// Hard
import fablabTilesJsonHard from "../resources/tiles/hard/fablab-tiles-hard.json";
import mFablabTilesJsonHard from "../resources/tiles/hard/fablab-tiles-hard-mobile.json";

import blankTile from "../resources/tiles/blankTile.png";
import blankHorizontalTiles from "../resources/tiles/blankHorizontalTiles.png";
import blankVerticalTiles from "../resources/tiles/blankVerticalTiles.png";

//Audio
import gameBGM from "../resources/audio/Gameplay.mp3";
import threeDPrinterSFX from "../resources/audio/3D Printer.mp3";
import laserCutterSFX from "../resources/audio/Laser Cutter.mp3";
import sawSFX from "../resources/audio/Saw.mp3";
import solderSFX from "../resources/audio/Solder.mp3";
import drillSFX from "../resources/audio/Drill (From Zapsplat).wav";
import fixingSFX from "../resources/audio/Fixing Tools (From Zapsplat).wav";
import completedSFX from "../resources/audio/Completed Component.mp3";
import pickupSFX from "../resources/audio/Player Picks Up Item.mp3";
import throwSFX from "../resources/audio/Player Throws Item Away.mp3";
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
import pauseBtn from "../resources/pause/pause_btn.png";
import pauseBtnPrs from "../resources/pause/pause_btn_prs.png";

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
        this.difficulty = data.difficulty;
        this.gender = data.gender;
    }

    preload() {
        this.preloadJsonTiles();
        this.load.plugin(
            'rex-virtual-joystick-plugin"',
            VirtualJoystickPlugin,
            true
        );
    }

    static preloadAssets(scene) {
        Game.preloadTiles(scene);
        Game.preloadAudio(scene);
        Game.preloadPlayerAnims(scene);
        Game.preloadButton(scene);
    }

    create() {
        // this.inPause = false;
        this.btnPrsSound = this.sound.add("btnPrsSound");
        this.scene.stop("CharacterMenu");
        this.scene.stop("MainMenu");
        this.sound.stopByKey("mainMenuBGM");
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
        switch (this.difficulty) {
            case "normal":
                this.componentsAvailable = Resources.getComponentNormal;
                break;
            case "hard":
                this.componentsAvailable = Resources.getComponentHard;
                break;
            default:
                this.componentsAvailable = Resources.getComponentsEasy;
                break;
        }

        // this.scoreController = this.game.scene.getScene("GameUI").add.scoreController(
        //     0.25,
        //     3,
        //     this.componentsAvailable,
        //     3,
        //     this.difficulty
        // );
        this.scoreController = this.game.scene
            .getScene("GameUI")
            .add.scoreController(
                11.1,
                0.75,
                this.componentsAvailable,
                3,
                this.difficulty
            );
        this.scoreController.setName("timer");

        var spawn = { x: 450, y: 325 };
        if (this.isMobile) {
            spawn = { x: 550, y: 350 };
        }
        // console.log(this.gender);
        this.player = this.add.player(
            spawn.x,
            spawn.y,
            "playersprite",
            0,
            this.gender,
            this.scoreController
        );
        this.player.scale = 0.25;

        for (var i in this.assemblyTables)
            this.assemblyTables[i].attachScoreController(this.scoreController);

        // this.loadButton();

        this.orderDisplay = new OrderDisplay(
            0,
            0,
            this.game.scene.getScene("GameUI")
        );
        this.scoreController.attachOrderDisplay(this.orderDisplay);
        this.scoreController.start();
        eventsCenter.on("pauseGame", this.pauseGame, this);
        eventsCenter.on("resumeGame", this.resumeGame, this);
        eventsCenter.on("startGame", this.startGame, this);

        this.physics.add.collider(this.player, this.walls);

        this.scene.run("GameUI");
        this.scene.bringToTop("GameUI");
        if (this.isMobile) this.setupMobile();
    }

    mobilePickItem(mCursors) {
        this.player.update(mCursors);
    }

    setupMobile() {
        this.cameras.main.startFollow(this.player, true);
        this.createVirtualJoystick();

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

    static preloadAudio(scene) {
        scene.load.audio("gameBGM", gameBGM);
        scene.load.audio("threeDPrinterSFX", threeDPrinterSFX);
        scene.load.audio("drillSFX", drillSFX);
        scene.load.audio("fixingSFX", fixingSFX);
        scene.load.audio("laserCutterSFX", laserCutterSFX);
        scene.load.audio("sawSFX", sawSFX);
        scene.load.audio("solderSFX", solderSFX);
        scene.load.audio("completedSFX", completedSFX);
        scene.load.audio("throwSFX", throwSFX);
        scene.load.audio("pickupSFX", pickupSFX);
    }

    static preloadTiles(scene) {
        scene.load.image("blankTile", blankTile);
        scene.load.image("blankHorizontalTiles", blankHorizontalTiles);
        scene.load.image("blankVerticalTiles", blankVerticalTiles);
        scene.load.image("tiles", fablabTiles);
        scene.load.image("playersprite", PlayerPlaceholderSprite);
    }
    preloadJsonTiles() {
        switch (this.difficulty) {
            case "hard":
                this.load.tilemapTiledJSON("tilemap_hard", fablabTilesJsonHard);
                this.load.tilemapTiledJSON(
                    "mTilemap_hard",
                    mFablabTilesJsonHard
                );
                this.tileLayers = fablabTilesJsonHard["layers"];
                break;
            case "normal":
                this.load.tilemapTiledJSON(
                    "tilemap_normal",
                    fablabTilesJsonNormal
                );
                this.load.tilemapTiledJSON(
                    "mTilemap_normal",
                    mFablabTilesJsonNormal
                );
                this.tileLayers = fablabTilesJsonNormal["layers"];
                break;
            default:
                this.load.tilemapTiledJSON("tilemap_easy", fablabTilesJsonEasy);
                this.load.tilemapTiledJSON(
                    "mTilemap_easy",
                    mFablabTilesJsonEasy
                );
                this.tileLayers = fablabTilesJsonEasy["layers"];
        }
    }

    static preloadPlayerAnims(scene) {
        scene.load.image("playersprite", PlayerPlaceholderSprite);
        scene.load.atlas("playeranims", playerSpriteSheet, playerSpriteJson);
    }

    static preloadButton(scene) {
        scene.load.image("pauseBtn", pauseBtn);
        scene.load.image("pauseBtnPrs", pauseBtnPrs);
    }

    loadTiles() {
        let map = this.make.tilemap({ key: "tilemap_" + this.difficulty });
        if (this.isMobile) {
            map = this.make.tilemap({ key: "mTilemap_" + this.difficulty });
            switch (this.difficulty) {
                case "hard":
                    this.tileLayers = mFablabTilesJsonHard["layers"];
                    break;
                case "normal":
                    this.tileLayers = mFablabTilesJsonNormal["layers"];
                    break;
                default:
                    this.tileLayers = mFablabTilesJsonEasy["layers"];
                    break;
            }
        }
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

    // loadButton() {
    //     var scale = 500 / 768;
    //     const pauseBtn = new Button(
    //         this,
    //         (1000 / 1090) * 800,
    //         (150 / 768) * 500,
    //         "pauseBtn",
    //         scale / 2,
    //         () => {
    //             this.pauseGame();
    //         },
    //         "pauseBtnPrs"
    //     );
    // }

    loadAudio() {
        const bgm = this.sound.add("gameBGM");
        bgm.play({
            volume: SettingsMenu.musicVolume / 18,
        });
    }

    loadAppliances() {
        this.assemblyTables = [];
        if (this.isMobile) {
            switch (this.difficulty) {
                case "hard":
                    this.tileLayers = mFablabTilesJsonHard["layers"];
                    break;
                case "normal":
                    this.tileLayers = mFablabTilesJsonNormal["layers"];
                    break;
                default:
                    this.tileLayers = mFablabTilesJsonEasy["layers"];
            }
        } else {
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
    startGame() {
        this.scoreController.changePause();
    }
    pauseGame() {
        this.sound.pauseAll();
        this.btnPrsSound.play({
            volume: SettingsMenu.sfxVolume / 18,
        });
        this.scoreController.changePause();
        this.scene.run("Pause");
        this.scene.pause("Game");
        this.scene.bringToTop("Pause");
        // console.log(this.scoreController.inPause);
    }
    resumeGame() {
        console.log("resume");
        this.sound.resumeAll();
        this.scoreController.changePause();
        this.scene.resume("Game");
        this.scene.stop("Pause");
        // console.log(this.scoreController.inPause);
    }
    // pauseGame() {
    //     this.scene.run("Pause");
    //     this.scene.pause("Game");
    //     this.scene.bringToTop("Pause");
    // }

    update() {
        if (InitialTutorial.firstGame) {
            this.startGame();
            this.sound.pauseAll();
            this.scene.pause("Game");
            this.scene.run("InitialTutorial");
            this.scene.bringToTop("InitialTutorial");
        }
        this.player.update(this.cursors);
        if (this.scoreController.isEndgame) {
            this.scale.stopFullscreen();
            this.scene.pause("Game");
            this.sound.stopAll();
            // console.log(this.scoreController.score);
            const data = {
                difficulty: this.difficulty,
                gender: this.gender === "girl" ? "F" : "M",
                score: this.scoreController.score,
                materials: this.scoreController.componentCollection,
            };
            this.scene.run("Endgame", data);
            this.scene.bringToTop("Endgame");
        }
        // console.log(this.scoreController.item);
    }
}
