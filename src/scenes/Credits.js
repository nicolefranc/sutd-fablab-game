import Button from "../sprites/button";
//TODO: use the actual button png
import backButton from "../resources/Main Menu/start.png";
import backButtonPrs from "../resources/Main Menu/start_prs.png";
import creditsBackground from "../resources/Main Menu/credits_background.png";

export default class Credits extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    preload() {
        this.load.image("backButton", backButton);
        this.load.image("backButtonPrs", backButtonPrs);
        this.load.image("creditsBackground", creditsBackground);
    }
    create() {
        var scale = 500 / 768;
        this.background = this.add.image(400, 250, "creditsBackground");
        this.background.setScale(scale);
        const backButton = new Button(
            this,
            (544 / 1090) * 800,
            (710 / 768) * 500,
            "backButton",
            scale,
            () => {
                this.game.scene.stop("Credits");
                this.game.scene.start("MainMenu");
                this.game.scene.bringToTop("MainMenu");
            }
        );

        console.log("Welcome to the credits scene");
    }
}
