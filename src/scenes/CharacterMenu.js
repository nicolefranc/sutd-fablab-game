import Phaser from "phaser";

import characterMenuBg from "../resources/CharacterMenu/charactersel_menu.png";
import boyChara from "../resources/CharacterMenu/boy.png";
import girlChara from "../resources/CharacterMenu/girl.png";
import girlBtn from "../resources/CharacterMenu/girl_btn.png";
import girlBtnPrs from "../resources/CharacterMenu/girl_btn_prs.png";
import boyBtn from "../resources/CharacterMenu/boy_btn.png";
import boyBtnPrs from "../resources/CharacterMenu/boy_btn_prs.png";
import backButton from "../resources/tutorial/left_button.png";
import Button from "../sprites/button";

export default class CharacterMenu extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    static preloadAssets(scene) {
        scene.load.image("characterMenuBg", characterMenuBg);
        scene.load.image("boyChara", boyChara);
        scene.load.image("girlChara", girlChara);
        scene.load.image("girlBtn", girlBtn);
        scene.load.image("girlBtnPrs", girlBtnPrs);
        scene.load.image("boyBtn", boyBtn);
        scene.load.image("boyBtnPrs", boyBtnPrs);
        scene.load.image("backButton", backButton);
    }
    init(data) {
        this.data = data;
    }
    create() {
        this.images = {};
        this.images["bg"] = {
            image: this.add.image(800 / 2, 500 / 2, "characterMenuBg"),
        };
        this.images["boyChara"] = this.add.image(800 / 4, 500 / 2, "boyChara");
        this.images["boyChara"].setScale(0.7, 0.7);
        this.images["girlChara"] = this.add.image(600, 500 / 2, "girlChara");
        this.images["girlChara"].setScale(0.7, 0.7);
        this.images["boyBtn"] = {
            image: new Button(
                this,
                200,
                (675 / 769) * 500,
                "boyBtn",
                500 / 769,
                () => {
                    this.sound.play("btnPrsSound");
                    this.game.scene.stop("DifficultyMenu");
                    this.game.scene.pause("CharacterMenu");
                    this.game.scene.start("Game", {
                        ...this.data,
                        gender: "boy",
                    });
                },
                "boyBtnPrs"
            ),
        };
        this.images["girlBtn"] = {
            image: new Button(
                this,
                590,
                (675 / 769) * 500,
                "girlBtn",
                500 / 769,
                () => {
                    this.sound.play("btnPrsSound");
                    this.game.scene.pause("CharacterMenu");
                    this.game.scene.stop("DifficultyMenu");
                    this.game.scene.start("Game", {
                        ...this.data,
                        gender: "girl",
                    });
                },
                "girlBtnPrs"
            ),
        };
        this.images["backButton"] = new Button(
            this,
            (80 / 1090) * 800,
            (225 / 768) * 500,
            "backButton",
            0.5,
            () => {
                this.sound.play("btnPrsSound");
                this.game.scene.pause("CharacterMenu");
                this.game.scene.run("DifficultyMenu");
                this.game.scene.bringToTop("DifficultyMenu");
            }
        );
        this.images["bg"]["image"].scale = 500 / 800;
    }
}
