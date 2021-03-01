import Phaser from "phaser";

import difficultyMenuBg from "../resources/Difficulty Menu/background_1.png";
import difficultyMenuEasyButton from "../resources/Difficulty Menu/easy.png";
import difficultyMenuNormalButton from "../resources/Difficulty Menu/normal.png";
import difficultyMenuHardButton from "../resources/Difficulty Menu/hard.png";
import backButton from "../resources/tutorial/left_button.png";
import Button from "../sprites/button";
import eventsCenter from "../events/EventsCenter";

export default class DifficultyMenu extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image("difficultyMenuBg", difficultyMenuBg);
        this.load.image("difficultyMenuEasyButton", difficultyMenuEasyButton);
        this.load.image(
            "difficultyMenuNormalButton",
            difficultyMenuNormalButton
        );
        this.load.image("difficultyMenuHardButton", difficultyMenuHardButton);
        this.load.image("backButton", backButton);
    }

    create() {
        this.images = {};
        this.images["bg"] = {
            image: this.add.image(800 / 2, 500 / 2, "difficultyMenuBg"),
        };
        this.images["difficultyMenuEasyButton"] = {
            image: new Button(
                this,
                (251 / 1368) * 800,
                (426 / 769) * 500,
                "difficultyMenuEasyButton",
                500 / 769,
                () => {
                    this.game.scene.stop("DifficultyMenu");
                    this.game.scene.start("Game", { difficulty: "easy" });
                    this.game.scene.bringToTop("Game");
                }
            ),
        };
        this.images["difficultyMenuNormalButton"] = {
            image: new Button(
                this,
                (684 / 1368) * 800,
                (427 / 769) * 500,
                "difficultyMenuNormalButton",
                500 / 769,
                () => {
                    this.game.scene.stop("DifficultyMenu");
                    this.game.scene.start("Game", { difficulty: "normal" });
                    this.game.scene.bringToTop("Game");
                }
            ),
        };
        this.images["difficultyMenuHardButton"] = {
            image: new Button(
                this,
                (1117 / 1368) * 800,
                (427 / 769) * 500,
                "difficultyMenuHardButton",
                500 / 769,
                () => {
                    this.game.scene.stop("DifficultyMenu");
                    this.game.scene.start("Game", { difficulty: "hard" });
                    this.game.scene.bringToTop("Game");
                }
            ),
        };
        this.images["bg"]["image"].scale = 500 / 769;
    }
}
