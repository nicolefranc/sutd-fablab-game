import Phaser from "phaser";
import Resources from "../resources/resources";
import quitOverlay from "../resources/QuitGame/quit_game_popup.png";
import quitBtnQ from "../resources/QuitGame/quitbutton.png";
import quitBtnQPrs from "../resources/QuitGame/quitbutton.png";
import cancelBtn from "../resources/QuitGame/cancelbutton.png";
import cancelBtnPrs from "../resources/QuitGame/cancelbutton.png";
import Button from "../sprites/button";
export default class QuitGame extends Phaser.Scene {
    static preloadAssets(scene) {
        scene.load.image("quitOverlay", quitOverlay);
        scene.load.image("quitBtnQ", quitBtnQ);
        scene.load.image("quitBtnQPrs", quitBtnQPrs);
        scene.load.image("cancelBtn", cancelBtn);
        scene.load.image("cancelBtnPrs", cancelBtnPrs);
    }

    //TODO: implement a resume button
    create() {
        this.veil = this.add.graphics({ x: 0, y: 0 });
        this.veil.fillStyle("0x000000", 0.6);
        this.veil.fillRect(0, 0, Resources.screenWidth, Resources.screenHeight);
        this.veil.setScrollFactor(0);
        this.menu = this.add.image(400, 250, "quitOverlay");
        this.menu.setScale(0.7);
        this.menu.setScrollFactor(0);
        this.buttons = [];
        this.buttons["quit"] = new Button(
            this,
            500,
            300,
            "quitBtnQ",
            0.4,
            () => {
                console.log("quit button pressed");
                this.scene.run("MainMenu");
                this.sound.play("mainMenuBGM");
                this.scene.stop("QuitGame");
                this.scene.stop("Game");
                this.scene.stop("GameUI");
            },
            "quitBtnQPrs"
        );
        this.buttons["cancel"] = new Button(
            this,
            300,
            300,
            "cancelBtn",
            0.4,
            () => {
                console.log("resume button pressed");
                this.scene.run("Pause");
                this.scene.stop("QuitGame");
            },
            "cancelBtnPrs"
        );
    }
}
