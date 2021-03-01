import Phaser from "phaser";
import Resources from "../resources/resources";
import pauseOverlay from "../resources/pause/pausemenu.png";
import guideBtn from "../resources/pause/guidetab.png";
import optionsBtn from "../resources/pause/optionstab.png";
import quitBtn from "../resources/pause/quit_btn.png";
import quitBtnPrs from "../resources/pause/quit_btn_prs.png";
import resumeBtn from "../resources/pause/resume_btn.png";
import resumeBtnPrs from "../resources/pause/resume_btn_prs.png";
import Button from "../sprites/button";
import TutorialMenu from "./TutorialMenu";
import SettingsMenu from "./SettingsMenu";
export default class Pause extends Phaser.Scene {
    
    static preloadAssets(scene) {
        scene.load.image("pauseOverlay", pauseOverlay);
        scene.load.image("guideBtn", guideBtn);
        scene.load.image("optionsPauseBtn", optionsBtn);
        scene.load.image("quitBtn", quitBtn);
        scene.load.image("quitBtnPrs", quitBtnPrs);
        scene.load.image("resumeBtn", resumeBtn);
        scene.load.image("resumeBtnPrs", resumeBtnPrs);
    }

    //TODO: implement a resume button
    create() {
        
        this.veil = this.add.graphics({ x: 0, y: 0 });
        this.veil.fillStyle("0x000000", 0.6);
        this.veil.fillRect(0, 0, Resources.screenWidth, Resources.screenHeight);
        this.veil.setScrollFactor(0);
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
                this.tutorialMenu.show();
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
                this.settingsMenu.show();
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
                this.scene.run("QuitGame");
                this.scene.bringToTop("QuitGame");
                this.scene.stop("Pause");
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
        this.tutorialMenu = new TutorialMenu(this,()=>{
            for (var i in this.buttons) {
                this.buttons[i].enable(false);
            }
        },()=>{
            for (var i in this.buttons) {
                this.buttons[i].enable(true);
            }
        });
        this.settingsMenu = new SettingsMenu(this,()=>{
            for (var i in this.buttons) {
                this.buttons[i].enable(false);
            }
        },()=>{
            for (var i in this.buttons) {
                this.buttons[i].enable(true);
            }
        });
    }
}
