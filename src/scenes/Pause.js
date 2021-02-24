import Phaser from "phaser";
import PauseMenu from "../resources/Options/how_to_play.png";

export default class Pause extends Phaser.Scene {
    preload() {
        this.load.image("pausemenu", PauseMenu);
    }

    //TODO: implement a resume button
    create() {
        this.menu = this.add.image(400, 250, "pausemenu");
        this.menu.setScrollFactor(0);
        this.menu.setInteractive();
        this.menu.on("pointerdown", () => this.scene.resume("Game"));
    }
}
