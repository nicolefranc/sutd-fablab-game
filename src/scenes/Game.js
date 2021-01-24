import Phaser from 'phaser'
import Player from "../sprites/Player.js"
import {Appliance, Bin, TimedAppliance} from "../sprites/Appliance.js"
import SpriteUp from "../assets/spriteup.png"
import SpriteDown from "../assets/spritedown.png"

export default class Game extends Phaser.Scene {
    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.load.image("player", SpriteUp);
        this.load.image("source", SpriteDown);
        this.load.multiatlas("gurl", GurlJSon, "../assets");
    }

    create() {
        this.player = this.add.player(400,250,"player");
        this.appliance = this.add.bin(100,100,"source", "thing");
        this.appliance2 = this.add.timedAppliance(300,100, "source", {
            "thing": {
                result: "new thing",
                time: 5000
            }
        });
    }

    update() {
        this.player.update(this.cursors);
    }
}