import Phaser from "phaser";
import LeaderboardUtils from "../leaderboard/leaderboardUtils";

import leaderboardScreenBackground from "../resources/Leaderboard Screen/leaderboardmenu_final.png";
import leaderboardScreenBoyHead from "../resources/Leaderboard Screen/boy_head.png";
import leaderboardScreenGirlHead from "../resources/Leaderboard Screen/girl_head.png";
import leaderboardScreenBoyFigure from "../resources/Leaderboard Screen/character_boy_2.png";
import leaderboardScreenGirlFigure from "../resources/Leaderboard Screen/character_girl.png";
import leaderboardScreenPodium from "../resources/Leaderboard Screen/podium.png";

import leaderboardScreenPos4 from "../resources/Leaderboard Screen/4.png";
import leaderboardScreenPos5 from "../resources/Leaderboard Screen/5.png";
import leaderboardScreenPos6 from "../resources/Leaderboard Screen/6.png";
import leaderboardScreenPos7 from "../resources/Leaderboard Screen/7.png";
import leaderboardScreenPos8 from "../resources/Leaderboard Screen/8.png";
import leaderboardScreenPos9 from "../resources/Leaderboard Screen/9.png";
import leaderboardScreenPos10 from "../resources/Leaderboard Screen/10.png";

export default class LeaderboardScreen extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    static preloadAssets(scene) {
        scene.load.image(
            "leaderboardScreenBackground",
            leaderboardScreenBackground
        );
        scene.load.image("leaderboardScreenBoyHead", leaderboardScreenBoyHead);
        scene.load.image(
            "leaderboardScreenGirlHead",
            leaderboardScreenGirlHead
        );
        scene.load.image(
            "leaderboardScreenBoyFigure",
            leaderboardScreenBoyFigure
        );
        scene.load.image(
            "leaderboardScreenGirlFigure",
            leaderboardScreenGirlFigure
        );
        scene.load.image("leaderboardScreenPodium", leaderboardScreenPodium);

        scene.load.image("leaderboardScreenPos4", leaderboardScreenPos4);
        scene.load.image("leaderboardScreenPos5", leaderboardScreenPos5);
        scene.load.image("leaderboardScreenPos6", leaderboardScreenPos6);
        scene.load.image("leaderboardScreenPos7", leaderboardScreenPos7);
        scene.load.image("leaderboardScreenPos8", leaderboardScreenPos8);
        scene.load.image("leaderboardScreenPos9", leaderboardScreenPos9);
        scene.load.image("leaderboardScreenPos10", leaderboardScreenPos10);
    }

    create() {
        this.bg = this.add.image(400, 250, "leaderboardScreenBackground");
        this.bg.scale = 500 / 769;
        this.bg.setInteractive({ useHandCursor: false }).on("pointerup", () => {
            this.scene.stop("LeaderboardScreen");
            this.scene.run("MainMenu");
        });
        this.text = this.add.text(400, 250, "Loading...", {
            fontFamily: "peepo",
        });
        this.text.setOrigin(0.5, 0.5);
        this.units = [];
        LeaderboardUtils.getScores(
            10,
            (scores) => {
                this.loadScores(scores);
            },
            (err) => {
                //console.log("test");
                //this.text.text = "Error retrieving score ... please try again later";
                this.loadScores(undefined);
            }
        );
    }

    loadScores(scores) {
        this.add
            .image(
                (439 / 1318) * 800,
                (577 / 768) * 500,
                "leaderboardScreenPodium"
            )
            .setScale(500 / 768);
        this.add
            .image(
                (442 / 1318) * 800,
                (302 / 768) * 500,
                "leaderboardScreenGirlFigure"
            )
            .setScale(500 / 768);
        this.add
            .image(
                (705 / 1318) * 800,
                (404 / 768) * 500,
                "leaderboardScreenGirlFigure"
            )
            .setScale(500 / 768);
        this.add
            .image(
                (178 / 1318) * 800,
                (465 / 768) * 500,
                "leaderboardScreenGirlFigure"
            )
            .setScale(500 / 768);
        for (var i = 0; i < 7; i++) {
            const j = i + 4;
            this.add
                .image(
                    (1060 / 1318) * 800,
                    ((208 + 81 * i) / 768) * 500,
                    "leaderboardScreenPos" + j
                )
                .setScale(500 / 768);
        }
    }
}

export class LeaderboardScreenScoreUnit {
    constructor(scene, x, y, name, score, pos) {
        this.scene = scene;
        this.rectangle = this.scene.add.rectangle(x, y, 600, 30, "0xffffff");
        this.text = this.scene.add.text(
            x,
            y,
            pos + "\t" + name + "\t\t\t" + score,
            { fontFamily: "peepo" }
        );
    }
}
