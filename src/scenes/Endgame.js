import Phaser from "phaser";
import Button from "../sprites/button";

import endGameMusic from "../resources/audio/Ending.mp3";
import leaderboardBtn from "../resources/endgame/leaderboardbutton.png";
import leaderboardBtnPrs from "../resources/endgame/leaderboardbuttonpressed.png";
import mainOverlay from "../resources/endgame/Popup.png";
import replayBtn from "../resources/endgame/replaybutton.png";
import replayBtnPrs from "../resources/endgame/replaybuttonpressed.png";
import Resources from "../resources/resources";
import SettingsMenu from "../scenes/SettingsMenu";
import MainMenu from "./MainMenu";

export default class Endgame extends Phaser.Scene {
    init(data) {
        this.data = data;
    }

    static preloadAssets(scene) {
        scene.load.audio("endGameMusic", endGameMusic);
        scene.load.image("mainOverlay", mainOverlay);
        scene.load.image("leaderboardBtn", leaderboardBtn);
        scene.load.image("leaderboardBtnPrs", leaderboardBtnPrs);
        scene.load.image("replayBtn", replayBtn);
        scene.load.image("replayBtnPrs", replayBtnPrs);
    }

    //TODO: implement a resume button
    create() {
        this.endGameMusic = this.sound.add("endGameMusic");
        this.endGameMusic.play({
            volume: SettingsMenu.musicVolume / 15,
            loop: true,
        });
        let printText = this.add.text(500, 400, "hello", {
            color: "0x000000",
            fontSize: 60,
        });

        this.veil = this.add.graphics({ x: 0, y: 0 });
        this.veil.fillStyle("0x000000", 0.6);
        this.veil.fillRect(0, 0, Resources.screenWidth, Resources.screenHeight);
        this.veil.setScrollFactor(0);
        this.username;
        this.mainOverlay = this.add.image(400, 250, "mainOverlay");
        this.mainOverlay.setScale(0.7);
        this.mainOverlay.setScrollFactor(0);
        const nextBtn = new Button(
            this,
            550,
            410,
            "leaderboardBtn",
            0.55,
            () => {
                console.log("leaderboard button pressed");
                this.sound.stopAll();
                MainMenu.dontPlay = false;
                this.scene.start("MainMenu");
                this.scene.bringToTop("MainMenu");
                this.scene.stop("Game");
                this.scene.stop("GameUI");
                this.scene.stop("Endgame");
            },
            "leaderboardBtnPrs"
        );
        const replayBtn = new Button(
            this,
            215,
            410,
            "replayBtn",
            0.7,
            () => {
                console.log("replay button pressed");
                this.sound.stopAll();
                // this.scene.stop("Game");
                // this.scene.stop("Endgame");
                this.scene.stop("GameUI");
                this.scene.start("Game", this.data);
            },
            "replayBtnPrs"
        );
    }
}
