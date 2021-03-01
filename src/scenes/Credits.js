import Button from "../sprites/button";
//TODO: use the actual button png
import backButton from "../resources/tutorial/left_button.png";
import creditsBackground from "../resources/Main Menu/credits_background.png";

export default class Credits extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    static preloadAssets(scene) {
        scene.load.image("backButton", backButton);
        scene.load.image("creditsBackground", creditsBackground);
    }
    create() {
        var scale = 500 / 768;
        this.background = this.add.image(400, 250, "creditsBackground");
        this.background.setScale(scale);
        const backButton = new Button(
            this,
            (100 / 1090) * 800,
            (80 / 768) * 500,
            "backButton",
            0.5,
            () => {
                this.game.scene.stop("Credits");
                this.game.scene.start("MainMenu");
                this.game.scene.bringToTop("MainMenu");
            }
        );

        console.log("Welcome to the credits scene");
    }
}
