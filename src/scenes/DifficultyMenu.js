import Phaser from "phaser";

import difficultyMenuBg from "../resources/Difficulty Menu/background_1.png";
import difficultyMenuEasyButton from "../resources/Difficulty Menu/easy.png";
import difficultyMenuNormalButton from "../resources/Difficulty Menu/normal.png";
import difficultyMenuHardButton from "../resources/Difficulty Menu/hard.png";
import backButton from "../resources/tutorial/left_button.png";
import Button from "../sprites/button";
import OrderDisplay from "../controllers/orderDisplay";

export default class DifficultyMenu extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    static preloadAssets(scene) {
        scene.load.image("difficultyMenuBg", difficultyMenuBg);
        scene.load.image("difficultyMenuEasyButton", difficultyMenuEasyButton);
        scene.load.image(
            "difficultyMenuNormalButton",
            difficultyMenuNormalButton
        );
        scene.load.image("difficultyMenuHardButton", difficultyMenuHardButton);
        scene.load.image("backButton", backButton);
    }

    create() {
        const data = {};
        this.btnPrsSound = this.sound.add("btnPrsSound");
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
                    data.difficulty = "easy";
                    this.btnPrsSound.play();
                    this.game.scene.pause("DifficultyMenu");
                    this.game.scene.start("CharacterMenu", data);
                    this.game.scene.bringToTop("CharacterMenu");
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
                    data.difficulty = "normal";
                    this.btnPrsSound.play();
                    this.game.scene.pause("DifficultyMenu");
                    this.game.scene.start("CharacterMenu", data);
                    this.game.scene.bringToTop("CharacterMenu");
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
                    data.difficulty = "hard";
                    this.btnPrsSound.play();
                    this.game.scene.pause("DifficultyMenu");
                    this.game.scene.start("CharacterMenu", data);
                    this.game.scene.bringToTop("CharacterMenu");
                }
            ),
        };
        this.images["backButton"] = new Button(
            this,
            (100 / 1090) * 800,
            (110 / 768) * 500,
            "backButton",
            0.5,
            () => {
                this.btnPrsSound.play();
                this.game.scene.pause("DifficultyMenu");
                this.game.scene.start("MainMenu");
                this.game.scene.bringToTop("MainMenu");
            }
        );
        this.images["bg"]["image"].scale = 500 / 769;
    }
}
