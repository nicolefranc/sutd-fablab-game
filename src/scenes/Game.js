import Phaser from "phaser";

import fablabTiles from "../resources/tiles/tile sheet final2.png";
import fablabTilesJson from "../resources/tiles/fablab_complete.json";
import blankTile from "../resources/tiles/blankTile.png";
import blankHorizontalTiles from "../resources/tiles/blankHorizontalTiles.png";
import blankVerticalTiles from "../resources/tiles/blankVerticalTiles.png";

import mainBGM from "../resources/audio/Gameplay.wav";

import Resources from "../resources/resources";
import Drill from "../appliances/drill";
import Saw from "../appliances/saw";
import MaterialBoxes from "../appliances/materialBoxes";
import WaitingTools from "../appliances/waitingTools";
import AssemblyTable from "../appliances/assemblyTable";
import Player from "../sprites/Player.js";
import ScoreController from "../controllers/scoreController";

import PlayerPlaceholderSprite from "../resources/Gurl/down-00.png";
import playerSpriteSheet from "../resources/players.png";
import playerSpriteJson from "../resources/players.json";
import cloudJson from "../resources/cloud/cloud_atlas.json";
import cloudSheet from "../resources/cloud/cloud.png";

import VirtualJoystickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin";

import LeaderboardUtils from "../leaderboard/leaderboardUtils";
import OrderDisplay from "../controllers/orderDisplay";

export default class Game extends Phaser.Scene {
    constructor(config) {
        super(config);
        //LeaderboardUtils.get("/",(chunk) => {alert(chunk)}, ()=> {});
    }

    preload() {
        Resources.preloadMaterialImages(this);
        this.preloadTiles();
        this.preloadAudio();
        this.preloadPlayerAnims();
        this.preloadCloud();
        this.cursors = this.input.keyboard.createCursorKeys();

        this.load.plugin(
            'rex-virtual-joystick-plugin"',
            VirtualJoystickPlugin,
            true
        );
    }

    create() {
        console.log(this.scene.systems.game.device.os.macOS);
        this.loadCloudAnims();
        this.loadTiles();
        this.loadAppliances();
        this.loadAudio();
        this.loadPlayerAnims();
        if (
            this.scene.systems.game.device.os.android ||
            this.scene.systems.game.device.os.iOS ||
            this.scene.systems.game.device.os.windowsPhone
        )
            this.createVirtualJoystick();
        this.scoreController = this.add.scoreController(
            0.25,
            3,
            ["jigsawAcrylic", "jigsawWood", "threeDPrint"],
            3,
            100
        );

        this.player = this.add.player(
            250,
            400,
            "playersprite",
            0,
            this.scoreController
        );
        this.player.scale = 0.3;

        for (var i in this.assemblyTables)
            this.assemblyTables[i].attachScoreController(this.scoreController);

        this.orderDisplay = new OrderDisplay(0, 0, this);
        this.scoreController.attachOrderDisplay(this.orderDisplay);
        this.scoreController.start();
    }

    createVirtualJoystick() {
        this.joyStick = this.plugins
            .get('rex-virtual-joystick-plugin"')
            .add(this, {
                x: 725,
                y: 425,
                radius: 50,
                base: this.add.circle(0, 0, 50, 0x888888),
                thumb: this.add.circle(0, 0, 25, 0xcccccc),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            })
            .on("update", this.updateJoystickState, this);
    }

    updateJoystickState() {
        this.cursors = this.joyStick.createCursorKeys();
    }

    preloadTiles() {
        this.load.image("blankTile", blankTile);
        this.load.image("blankHorizontalTiles", blankHorizontalTiles);
        this.load.image("blankVerticalTiles", blankVerticalTiles);
        this.load.image("tiles", fablabTiles);

        this.load.image("playersprite", PlayerPlaceholderSprite);

        this.load.tilemapTiledJSON("tilemap", fablabTilesJson);
    }
    preloadAudio() {
        this.load.audio("mainBGM", mainBGM);
    }
    preloadPlayerAnims() {
        this.load.image("playersprite", PlayerPlaceholderSprite);
        this.load.atlas("playeranims", playerSpriteSheet, playerSpriteJson);
    }

    preloadCloud() {
        this.load.atlas("cloudsheet", cloudSheet, cloudJson);
    }

    loadTiles() {
        const map = this.make.tilemap({ key: "tilemap" });
        const tileset = map.addTilesetImage("fablab_tileset_complete", "tiles");
        const floor = map.createLayer("Floor", tileset);
        const walls = map.createLayer("Walls", tileset);
        this.walls = walls;
    }
    loadAudio() {
        const bgm = this.sound.add("mainBGM");
        bgm.play();
    }
    loadAppliances() {
        this.assemblyTables = [];
        this.appliances = [];
        for (var i = 0; i < fablabTilesJson["layers"].length; i++) {
            var j = fablabTilesJson["layers"][i];
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
                                let matBox = this.add.materialBox(gridX, gridY, l);
                                this.appliances.push(matBox);
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
                            let lC = this.add.laserCutter(gridX, gridY);
                            this.appliances.push(lC);
                            continue;
                        }
                        if (
                            Resources.waitingTools.threeDPrinter.tileIds.indexOf(
                                id
                            ) !== -1
                        ) {
                            let threedp = this.add.threeDPrinter(gridX, gridY);
                            this.appliances.push(threedp)
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
                            let d = this.add.drill(gridX, gridY);
                            this.appliances.push(d);
                            continue;
                        }
                        if (
                            Resources.interactiveTools.saw.tileIds.indexOf(
                                id
                            ) !== -1
                        ) {
                            let s = this.add.saw(gridX, gridY);
                            this.appliances.push(s);
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

    loadCloudAnims(){
        const frameNames = this.anims.generateFrameNames(
            "cloudsheet",
            {
                prefix: "cloud",
                zeroPad: 1,
                start: 1,
                end: 3,
            }
        );
        console.log(frameNames);
        this.anims.create({
            key: "cloudAnim",
            frames: frameNames,
            frameRate: 3,
            repeat: -1
        });
    }

    update() {
        this.player.update(this.cursors);
    }
}
