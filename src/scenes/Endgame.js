import Phaser from "phaser";
import Button from "../sprites/button";
import leaderboardBtn from "../resources/endgame/leaderboardbutton.png";
import leaderboardBtnPrs from "../resources/endgame/leaderboardbuttonpressed.png";
import mainOverlay from "../resources/endgame/Popup.png";
import replayBtn from "../resources/endgame/replaybutton.png";
import replayBtnPrs from "../resources/endgame/replaybuttonpressed.png";

export default class EndgameOverlay extends Phaser.Scene {

    init(data) {
        this.data = data;
    }

    static preloadAssets(scene) {
        scene.load.image("mainOverlay", mainOverlay);
        scene.load.image("leaderboardBtn", leaderboardBtn);
        scene.load.image("leaderboardBtnPrs", leaderboardBtnPrs);
        scene.load.image("replayBtn", replayBtn);
        scene.load.image("replayBtnPrs", replayBtnPrs);
    }

    //TODO: implement a resume button
    create() {
        this.mainOverlay = this.add.image(400, 250, "mainOverlay");
        this.mainOverlay.setScale(0.7);
        this.mainOverlay.setScrollFactor(0);
        const nextBtn = new Button(
            this,
            500,
            250,
            "leaderboardBtn",
            0.5,
            () => {
                console.log("leaderboard button pressed");
                this.scene.start("MainMenu");
                this.scene.bringToTop("MainMenu");
                this.scene.stop("Game");
                this.scene.stop("Endgame");
            },
            "leaderboardBtnPrs"
        );
        const replayBtn = new Button(
            this,
            200,
            250,
            "replayBtn",
            0.7,
            () => {
                console.log("replay button pressed");
                // this.scene.stop("Game");
                // this.scene.stop("Endgame");
                this.scene.stop("GameUI");
                this.scene.start("Game", this.data);
            },
            "replayBtnPrs"
        );
    }
}
