import Phaser from "phaser";
import pauseOverlay from "../resources/pause/pausemenu.png";
import guideBtn from "../resources/pause/guidetab.png";
import optionsBtn from "../resources/pause/optionstab.png";
import quitBtn from "../resources/pause/quit_btn.png";
import quitBtnPrs from "../resources/pause/quit_btn_prs.png";
import resumeBtn from "../resources/pause/resume_btn.png";
import resumeBtnPrs from "../resources/pause/resume_btn_prs.png";
import Button from "../sprites/button";
export default class Pause extends Phaser.Scene {
    preload() {
        this.load.image("pauseOverlay", pauseOverlay);
        this.load.image("guideBtn", guideBtn);
        this.load.image("optionsPauseBtn", optionsBtn);
        this.load.image("quitBtn", quitBtn);
        this.load.image("quitBtnPrs", quitBtnPrs);
        this.load.image("resumeBtn", resumeBtn);
        this.load.image("resumeBtnPrs", resumeBtnPrs);
    }

    //TODO: implement a resume button
    create() {
        this.menu = this.add.image(400, 250, "pauseOverlay");
        this.menu.setScale(0.3);
        this.menu.setScrollFactor(0);
        this.buttons = [];
        this.buttons["guide"] = new Button(
            this,
            575,
            200,
            "guideBtn",
            0.5,
            () => {
                console.log("guide button pressed");
            }
        );
        this.buttons["optionsPause"] = new Button(
            this,
            575,
            325,
            "optionsPauseBtn",
            0.5,
            () => {
                console.log("options button pressed");
            }
        );
        this.buttons["quit"] = new Button(
            this,
            300,
            300,
            "quitBtn",
            0.2,
            () => {
                console.log("quit button pressed");
            },
            "quitBtnPrs"
        );
        this.buttons["resume"] = new Button(
            this,
            475,
            300,
            "resumeBtn",
            0.2,
            () => {
                console.log("resume button pressed");
                this.scene.resume("Game");
                this.scene.stop("Pause");
            },
            "resumeBtnPrs"
        );
    }
}
